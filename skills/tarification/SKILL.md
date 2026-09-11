---
name: tarification
description: Analyser, calculer et simuler des prix à partir de coûts et d’objectifs explicitement fournis, sans déterminer seul le prix commercial final.
---

# Tarification — Contrat fonctionnel V1

## 1. Mission

Analyser la structure économique d’un prix ; calculer un prix à partir d’un coût
et d’une marge cible fournie ; calculer le prix minimum nécessaire pour couvrir
un périmètre de coûts explicite ; mesurer la marge associée à un prix donné ;
comparer des scénarios tarifaires ; et analyser l’effet d’une remise ou d’une
variation de coûts fournie. Préparer une décision de prix sans décider seul du
prix commercial final.

Toujours distinguer données réelles, hypothèses, calculs, résultats,
recommandations et limites. Ne jamais inventer une donnée absente.

## 2. Concepts à distinguer

### Coût de revient

Coût utilisé comme base de calcul pour un périmètre donné. Sa composition, sa
période, sa devise et sa base HT ou TTC doivent être documentées.

### Prix minimum économique

Prix nécessaire pour couvrir le périmètre de coûts retenu. Il ne constitue pas
automatiquement un prix commercial acceptable.

### Prix avec marge cible

Prix calculé à partir d’un coût et d’un objectif de marge explicitement fourni.

### Prix simulé

Prix utilisé dans un scénario. Il n’est ni une décision, ni nécessairement un
prix réel.

### Prix de marché

Information externe issue d’une étude ou d’une source identifiée. Le sous-skill
ne l’invente pas.

### Prix commercial retenu

Décision finale tenant compte de l’économie, du marché, de la valeur, du
positionnement et de la stratégie commerciale. Le sous-skill y contribue sans
prétendre la déterminer seul.

## 3. Modes de fonctionnement

**Mode réel** : utiliser des coûts, prix ou données effectivement observés,
avec leur provenance et leur période.

**Mode scénario** : utiliser les hypothèses explicitement fournies. Ce mode
fonctionne sans historique. Une donnée réelle employée dans un scénario reste
identifiée séparément de l’hypothèse ; le résultat reste un scénario.

## 4. Données possibles

Les entrées possibles sont : coût de revient total, coût unitaire, coûts fixes
affectés, coûts variables, temps de travail, coût horaire explicitement fourni,
coût de sous-traitance, coûts logiciels, coûts d’infrastructure, frais de
paiement, prix actuel, prix simulé, volume, marge cible, remise, période,
devise et base HT ou TTC.

Ne pas exiger toutes ces données pour chaque calcul. Pour toute entrée retenue,
indiquer valeur, unité, période, devise, base HT ou TTC, périmètre de coûts,
provenance et statut réel ou hypothétique. Ne jamais remplacer une donnée
absente par zéro.

## 5. Formules

Utiliser des données de périmètre, période, devise et base cohérents.

### Marge en valeur

```text
marge
= prix_vente - cout
```

### Taux de marque

```text
taux_marque
= marge / prix_vente
```

### Taux de marge

```text
taux_marge
= marge / cout
```

Le taux de marque et le taux de marge ne doivent jamais être confondus.

### Prix pour un taux de marque cible

```text
prix_cible
= cout / (1 - taux_marque_cible)
```

Cette formule nécessite :

```text
0 <= taux_marque_cible < 1
```

### Prix pour un taux de marge cible

```text
prix_cible
= cout * (1 + taux_marge_cible)
```

```text
taux_marque_cible
≠
taux_marge_cible
```

Les deux formules ne sont pas interchangeables.

### Remise

```text
prix_apres_remise
= prix_initial * (1 - taux_remise)
```

Recalculer la marge à partir de ce nouveau prix. Pour une hausse ou une baisse
de coût, calculer uniquement avec la variation fournie ; ne jamais la supposer.

## 6. Prix minimum économique

`prix_minimum_economique` désigne le prix nécessaire pour couvrir le périmètre
de coûts explicitement retenu. Par exemple :

```text
prix_minimum_economique
= cout_total_retenu
```

Le coût utilisé et le prix calculé doivent porter sur la même unité économique
et le même périmètre. Un coût global de période ne peut pas être utilisé comme
prix unitaire sans règle d’allocation explicitement fournie.

si l’objectif est uniquement de couvrir les coûts. Si une marge minimale est
explicitement demandée, le résultat est un prix cible avec marge, et non un
simple prix minimum de couverture. Ne pas mélanger ces notions.

## 7. Coût du temps de travail

Valoriser le temps seulement si le nombre d’heures et le coût horaire sont
fournis :

```text
cout_travail
= heures * cout_horaire
```

Ne jamais inventer un coût horaire. Un tarif facturé au client n’est pas
automatiquement un coût horaire interne.

## 8. Remises

Le sous-skill peut analyser la remise en valeur ou en pourcentage, la marge
après remise, un prix plancher fourni et l’écart à une marge cible. Il ne décide
jamais automatiquement d’une remise maximale sans règle explicitement fournie.

Signaler mathématiquement qu’une remise réduit fortement la marge, la rend nulle
ou négative ; définir « fortement » seulement si un seuil de comparaison est
fourni.

## 9. Volume et élasticité prix

Comparer des couples `prix` / `volume` uniquement si les volumes sont fournis
comme données ou hypothèses. Ne jamais déduire automatiquement une baisse de
volume d’une hausse de prix, ni inventer une élasticité prix. Toute hypothèse de
variation de volume figure dans « Hypothèses ».

## 10. Prix de marché

Ne pas rechercher ni créer de prix de marché à partir de données inexistantes.
Toute donnée de marché indique sa source, sa date, son périmètre et sa
comparabilité. Le sous-skill peut conclure qu’un prix est économiquement viable
sans conclure qu’il est compétitif ou commercialement acceptable. Lorsque
pertinent, orienter vers un skill marketing ou une analyse de marché distincte.

## 11. Cas particuliers et contrôles

| Situation | Comportement attendu |
| --- | --- |
| Coût nul | La marge en valeur peut être calculée ; le taux de marge est indisponible par division par zéro. |
| Prix nul | La marge peut être calculée ; le taux de marque est indisponible par division par zéro. |
| Prix ou coût négatif | Refuser le calcul et demander une donnée corrigée ou une qualification explicite. |
| Taux de marque cible inférieur à 0 ou égal ou supérieur à 100 % | Refuser la formule de prix cible. |
| Taux de marge incohérent | Demander clarification sur sa définition, son unité et son signe. |
| Remise inférieure à 0 ou égale ou supérieure à 100 % | Refuser la formule de remise et demander clarification. |
| HT/TTC mélangés ou inconnus | Demander une base cohérente ; ne pas supposer de taux. |
| Devises mélangées | Demander une devise commune ou un taux, une date et une convention explicitement fournis. |
| Périodes incompatibles | Suspendre le calcul concerné jusqu’à harmonisation explicite. |
| Donnée non numérique ou valeur non finie | Refuser la donnée. |
| Marge négative | Produire le constat mathématique, avec avertissement ; ne pas la présenter comme une marge cible atteinte. |
| Donnée indispensable absente | Demander précisément la donnée et limiter la sortie aux résultats calculables. |

Ne pas corriger, reclasser ou compléter silencieusement les données. Refuser les
sorties trompeuses et expliquer le blocage.

## 12. Arrondis

Les montants monétaires peuvent être affichés à deux décimales, en conservant
la précision nécessaire pendant le calcul. Ne pas arrondir prématurément. Si un
prix commercial doit respecter un pas tel que `1 €`, `5 €` ou `10 €`, ce pas doit
être fourni explicitement. Ne pas inventer de règle d’arrondi marketing.

## 13. Format d’analyse

Toute analyse importante présente, dans cet ordre :

```text
Données connues
Hypothèses
Périmètre de coûts
Calcul
Résultat
Interprétation
Limites
```

Toute éventuelle recommandation est placée dans une section distincte :

```text
Recommandation
```

Ne jamais fusionner résultat calculé et recommandation.

## 14. Analyse de scénarios

Comparer plusieurs prix, marges cibles, structures de coûts, remises,
configurations d’internalisation ou de sous-traitance, et volumes explicitement
fournis. Chaque scénario doit employer une période, une devise, une base HT/TTC
et un périmètre de coûts cohérents et explicites. Identifier les paramètres
modifiés et ceux maintenus constants ; ne pas inventer de variation.

## 15. Données réglementaires

Le sous-skill ne connaît pas directement la TVA, les cotisations sociales, les
impôts, les taux réglementaires ni les obligations françaises. Ces éléments ne
peuvent entrer dans les coûts que s’ils sont fournis ou proviennent, à terme,
d’une référence vérifiée dans [references/france/](../../references/france/).
Aucune valeur réglementaire n’est codée dans ce `SKILL.md`.

## 16. Frontières

Le sous-skill ne doit pas déterminer seul le prix commercial final, déterminer
la demande, prévoir les ventes, inventer une marge cible, un taux de conversion,
une élasticité prix, un coût horaire ou une remise maximale, produire une étude
de concurrence sans données, ni faire de comptabilité officielle.

Pour le seuil, utiliser si nécessaire
[seuil-rentabilite](../seuil-rentabilite/SKILL.md). Pour le marché et le
positionnement, orienter vers une analyse marketing distincte.

## 17. Sorties prévues

La sortie humaine est structurée selon le format d’analyse ci-dessus. Une future
sortie structurée pourra contenir, à titre conceptuel :

```text
mode
periode
devise
base_montant
cout
prix_actuel
prix_simule
marge
taux_marque
taux_marge
marge_cible
prix_cible
remise
hypotheses
avertissements
```

Associer aux montants leurs unités, devise, base et périmètre ; identifier les
sorties indisponibles avec leur motif. Aucun JSON ni script n’est implémenté.

## 18. Tests automatisés V1

- Marge positive, nulle et négative.
- Coût nul et prix nul.
- Taux de marque cible valide et taux de marque cible égal à 100 %.
- Différence entre taux de marque et taux de marge.
- Remise normale, remise conduisant à une marge nulle et marge négative.
- Coût horaire absent.
- Scénario et réel, avec provenance visible.
- Bases HT/TTC et devises incohérentes.
- Variation de coût fournie et variation de volume non fournie.
- Comparaison de plusieurs scénarios.

L’engine V1 est présent dans `engine/`. La suite
`tests/tarification/calculate.test.ts` contient 43 tests automatisés.

## 19. Statut V1

Le contrat fonctionnel V1 et son engine déterministe sont implémentés, validés
et figés. Aucun composant tiers n’est embarqué. Open Accountant
`pricing-optimizer` est seulement envisagé comme source d’adaptation future ;
aucun contenu tiers n’est repris dans ce fichier.
