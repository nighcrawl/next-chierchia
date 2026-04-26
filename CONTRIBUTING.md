# Contributing to next-chierchia

## Commit Message Format

Ce projet utilise [Conventional Commits](https://www.conventionalcommits.org/) pour standardiser les messages de commit et permettre les releases automatiques.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types disponibles

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Changements de style (formatting, etc)
- `refactor`: Refactoring de code
- `perf`: Améliorations de performance
- `test`: Tests
- `chore`: Processus de build, mises à jour de dépendances, etc
- `ci`: Configuration CI
- `build`: Changements du système de build
- `revert`: Révert de commit

### Exemples

```bash
feat(posts): add pagination for blog posts
fix(auth): resolve login validation error
docs(readme): update installation instructions
style(components): fix linting errors
refactor(api): simplify data fetching logic
perf(images): optimize image loading
test(utils): add unit tests for helpers
chore(deps): update dependencies
ci(github): add release workflow
build(next): update webpack configuration
revert: remove experimental feature
```

## Release Process

Les releases sont automatiquement créées lors des pushes sur la branche `main` en fonction des commits :

- `fix`: Patch release (1.0.1)
- `feat`: Minor release (1.1.0)
- `feat` + `BREAKING CHANGE`: Major release (2.0.0)

Un changelog est automatiquement généré et une GitHub release est créée.

## Développement

1. Fork le projet
2. Créer une branche `feature/nom-de-la-feature`
3. Faire les commits en respectant le format Conventional Commits
4. Pusher et créer une Pull Request
5. La review et la fusion déclencheront une release automatique si c'est sur `main`
