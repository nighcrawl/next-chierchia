# Résumé du projet `next-chierchia`

Ce document résume les décisions techniques, la structure mise en place et les principaux composants déjà créés pour transformer `chierchia.fr` en front Next.js branché sur WordPress en headless.

## Objectif

Le projet consiste à conserver le WordPress actuel comme source de contenu via l’API REST, tout en développant en parallèle un nouveau front Next.js sans interrompre l’accessibilité du site existant.
Le front en cours de développement consomme donc les contenus de `https://chierchia.fr/wp-json/wp/v2`, tandis que le site WordPress actuel reste public pendant toute la phase de migration.

## Stack retenue

La base choisie est Next.js avec App Router, TypeScript, ESLint et Tailwind CSS, ce qui correspond à un setup standard moderne pour un front headless.
Tailwind a été intégré dès l’initialisation pour accélérer la construction de l’interface tout en permettant de se familiariser avec son approche utility-first.
Le WordPress existant est utilisé comme API REST, sans migration immédiate du CMS vers un autre sous-domaine.

## Initialisation du projet

Le projet Next.js a été initialisé à la racine avec un fichier `.env.local` placé au même niveau que `package.json`, `next.config.ts` et `src/`.

## Client WordPress

Un fichier `src/lib/wordpress.ts` a été mis en place pour centraliser les appels à l’API REST WordPress avec un helper `wpFetch<T>()` typé.
Les fonctions suivantes ont été introduites progressivement pour lire les données côté front :

- `getPosts()`
- `getPostBySlug()`
- `getPages()`
- `getPageBySlug()`
- `getTagsByIds()`
- `getCategoriesByIds()`

Le paramètre `_embed` est utilisé sur les posts pour simplifier la récupération de ressources liées, notamment les médias.

## Typage TypeScript

Les réponses de l’API WordPress ont été typées pour rendre le code plus fiable, améliorer l’autocomplétion et détecter plus tôt les erreurs de structure de données.
Un fichier `src/lib/wordpress-types.ts` contient les types minimum utiles pour le projet, notamment pour les posts, pages, taxonomies et champs `rendered`.

Un type enrichi a ensuite été introduit dans `src/lib/post-types.ts` :

```ts
import type { WordPressPost, WordPressTerm } from "@/lib/wordpress-types";

export type EnrichedPost = WordPressPost & {
  tagObjects: WordPressTerm[];
  categoryObjects: WordPressTerm[];
};
```

Ce type évite de recalculer ou retransformer les données dans plusieurs composants.

## Enrichissement des posts

Dans `page.tsx`, les posts récupérés depuis WordPress sont enrichis avec leurs catégories et leurs tags résolus sous forme d’objets complets, via `Promise.all()`.
Cette étape permet de passer ensuite à l’interface un tableau de `EnrichedPost[]` prêt à afficher, sans logique de récupération supplémentaire dans les composants visuels.

Le pattern retenu est le suivant :

```tsx
const postsWithTerms: EnrichedPost[] = await Promise.all(
  posts.map(async (post) => {
    const [tagObjects, categoryObjects] = await Promise.all([
      getTagsByIds(post.tags),
      getCategoriesByIds(post.categories),
    ]);

    return {
      ...post,
      tagObjects,
      categoryObjects,
    };
  })
);
```

## Rendu conditionnel par type de contenu

Une logique métier a été introduite pour afficher les posts différemment selon leur catégorie WordPress.
Le choix du rendu repose sur le slug des catégories, jugé plus stable que leur nom d’affichage.

Les règles actuellement définies sont les suivantes :

| Type | Règle d’affichage |
|---|---|
| `notes` | Pas de titre, affichage du contenu complet. |
| `bookmarks` | Affichage du titre et du contenu complet. |
| `articles` | Affichage du titre et de l’excerpt uniquement. |
| `journal` | Affichage du titre et de l’excerpt, avec traitement visuel distinct. |

Cette logique a été isolée dans `src/lib/post-kind.ts`, avec une fonction `getPostKind(post)` qui retourne un type métier parmi `bookmark`, `note`, `article`, `journal` ou `default`.

## Architecture des composants

Le rendu a été découpé en composants spécialisés par type de contenu pour éviter d’empiler des conditions dans `page.tsx`.
La structure retenue est la suivante :

```txt
src/
  components/
    posts/
      post-card.tsx
      post-meta.tsx
      article-post-card.tsx
      journal-post-card.tsx
      note-post-card.tsx
      bookmark-post-card.tsx
```

Le composant `PostCard` joue un rôle de routeur : il reçoit un `EnrichedPost`, détermine son type, choisit son thème, puis délègue l’affichage au bon composant enfant.[28][34]

## Métadonnées communes

Les métadonnées communes — date de publication, catégories, tags — ont été extraites dans un composant partagé `PostMeta`.
Cela évite de répéter la même structure dans chaque carte de post et permet d’unifier le rendu des taxonomies sur l’ensemble du blog.

Le composant formate la date avec `Intl.DateTimeFormat("fr-FR")`, puis affiche les catégories et tags déjà enrichis sous forme de badges.

## Correction d’une erreur TypeScript/JSX

Une erreur a été rencontrée dans `post-meta.tsx` lors du rendu des tags. Le problème venait d’un `map()` avec des accolades `{}` sans `return`, ce qui produisait un tableau de `void` au lieu d’un tableau de nœuds React.
La correction a consisté à utiliser soit un retour implicite avec `()`, soit un `return` explicite dans la callback du `map()`.

## Thématisation des types de contenu

Un système de thème par type de post a été mis en place pour associer des classes Tailwind différentes à chaque famille de contenu, sans générer dynamiquement des classes du type `bg-${color}-100`, ce qui est déconseillé avec Tailwind.
Le mapping de thème a été centralisé dans `src/lib/post-theme.ts` avec des classes statiques complètes.

L’idée retenue est la suivante :

- `bookmark` → teal
- `note` → blue
- `article` → zinc neutre
- `journal` → amber doux

Le thème est calculé une seule fois dans `PostCard`, puis transmis aux composants enfants via les props, ce qui évite de recalculer `getPostKind(post)` dans plusieurs fichiers.

## Rôle de `PostCard`

Le composant `PostCard` est devenu le point central de décision pour le rendu d’un post.
Il :

- reçoit un `EnrichedPost`,
- calcule `kind` via `getPostKind(post)`,
- récupère `theme` depuis `postThemeMap`,
- transmet `post`, `kind` et `theme` au bon composant enfant.

Cette approche réduit la duplication logique et rend les composants enfants beaucoup plus simples.

## État actuel du projet

À ce stade, le projet permet déjà :

- de consommer les vrais contenus WordPress depuis le site existant,
- d’enrichir les posts avec catégories et tags,
- de typer correctement les données côté TypeScript,
- de rendre les posts différemment selon leur type éditorial,
- d’appliquer un thème visuel différent par famille de contenu avec Tailwind.

Le chantier est donc déjà bien avancé sur la partie structure des données, architecture des composants et logique de rendu.

## Étapes logiques suivantes

Les prochaines étapes cohérentes pour continuer le projet sont les suivantes :

1. Ajouter les liens vers les pages de détail des articles et pages de taxonomies.
2. Gérer les images mises en avant sur les cartes et dans les pages single.
3. Construire les routes `blog/[slug]`, `tag/[slug]` et `category/[slug]`.
4. Ajouter le SEO, les métadonnées Open Graph et éventuellement la pagination.
5. Préparer ensuite la bascule progressive du front public une fois la parité fonctionnelle atteinte.