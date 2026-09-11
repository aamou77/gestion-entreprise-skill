---
name: seuil-rentabilite
description: Calculer ou simuler le seuil de rentabilité, les ventes nécessaires, la marge de sécurité et, si les données le permettent, le point mort à partir de données observées ou d’hypothèses explicitement fournies, même sans historique.
---

# Seuil de rentabilité — Contrat fonctionnel V1

## 1. Mission

Calculer ou simuler le seuil de rentabilité, le nombre de ventes ou de clients
nécessaires, la marge de sécurité et les effets de variations fournies.
Calculer le point mort lorsque les données temporelles permettent de situer
l’atteinte du seuil dans la période.
Distinguer données réelles, hypothèses, calculs, résultats et limites.
Ne jamais inventer une donnée manquante.

## 2. Cas d’utilisation

- Prestation vendue à prix fixe.
- Produit vendu à l’unité.
- Offre récurrente, avec une unité et une durée de facturation explicites.
- Comparaison de plusieurs prix.
- Comparaison de plusieurs niveaux de coûts.
- Simulation d’une entreprise sans historique.

Pour plusieurs offres, ne pas inventer de prix moyen ni de répartition des ventes.
Demander une composition explicite ou analyser les offres séparément sans
répartir arbitrairement les coûts fixes communs.

## 3. Modes de fonctionnement

**Mode réel** : utiliser des données observées, identifiées par leur provenance
et leur période. Une extrapolation n’est pas une donnée réelle.

**Mode scénario** : utiliser les hypothèses explicitement fournies. Ce mode peut
fonctionner sans aucune donnée historique. Si des données réelles servent de
base, les identifier séparément des hypothèses ; le résultat reste un scénario.
Ne jamais présenter une hypothèse comme une donnée réelle.

## 4. Données nécessaires

Pour chaque entrée, indiquer sa valeur, son unité ou sa devise, sa période,
sa provenance et son statut réel ou hypothétique. Pour les montants concernés,
préciser la base HT ou TTC. La période des coûts fixes doit toujours être connue.

| Donnée | Utilité |
| --- | --- |
| Période étudiée | Délimiter l’analyse et rapprocher les montants |
| Coûts fixes de cette période | Calculer le seuil |
| Prix de vente unitaire et coût variable unitaire | Calculer la contribution et le seuil en unités |
| Chiffre d’affaires et coûts variables globaux | Calculer le taux de marge et le seuil en chiffre d’affaires |
| Volume de ventes | Relier données unitaires et globales si les conditions sont homogènes |
| Revenus récurrents, fréquence et durée | Définir une unité récurrente cohérente avec la période |
| Nombre de clients et ventes ou revenu par client | Convertir un seuil en clients si la relation est explicitée |
| Chiffre d’affaires réel ou de scénario | Calculer la marge de sécurité |
| Durée, début de période et répartition temporelle | Situer le point mort |

Choisir la voie unitaire ou globale selon les données disponibles ; toutes les
entrées ne sont pas nécessaires à chaque sortie. Une valeur dérivée de données
fournies doit apparaître comme un calcul traçable, jamais comme une observation.
Ne pas remplacer une donnée absente par zéro.

Un client ne vaut pas automatiquement une vente. Pour une offre récurrente,
un abonnement mensuel représente une unité client-mois, pas nécessairement un
client distinct sur toute la période. Demander la durée et la contribution par
client avant toute conversion ; ne pas supposer de renouvellement ou de fidélité.

## 5. Formules

Les montants doivent porter sur un périmètre cohérent. Le modèle suppose des
coûts fixes constants sur la période et une contribution unitaire ou un taux de
marge constant dans le scénario analysé. Faire expliciter ces conditions si
elles ne sont pas établies ; ne pas extrapoler silencieusement un taux observé.

### Voie unitaire

```text
marge_sur_cout_variable_unitaire
= prix_unitaire - cout_variable_unitaire

seuil_en_unites
= couts_fixes / marge_sur_cout_variable_unitaire

seuil_chiffre_affaires
= seuil_en_unites * prix_unitaire
```

La division exige une contribution strictement positive. Le seuil en chiffre
d’affaires utilise la valeur mathématique du seuil en unités, avant arrondi.

### Voie chiffre d’affaires

```text
taux_couts_variables
= couts_variables / chiffre_affaires

taux_marge_sur_cout_variable
= 1 - taux_couts_variables

seuil_chiffre_affaires
= couts_fixes / taux_marge_sur_cout_variable
```

Le chiffre d’affaires servant au taux doit être strictement positif ; le taux
de marge doit être strictement positif pour calculer un seuil par division.

### Marge de sécurité

```text
marge_securite
= chiffre_affaires_reel_ou_scenario - seuil_chiffre_affaires

taux_marge_securite
= marge_securite / chiffre_affaires_reel_ou_scenario
```

Calculer le taux uniquement si le chiffre d’affaires est strictement positif.
Une marge positive indique un dépassement du seuil ; une marge négative indique
un manque de chiffre d’affaires pour l’atteindre, pas le montant de la perte.

### Point mort

Uniquement si une activité uniforme sur la période est explicitement fournie
ou retenue par l’utilisateur comme hypothèse :

```text
delai_point_mort
= (seuil_chiffre_affaires / chiffre_affaires_de_la_periode) * duree_periode
```

Exiger un chiffre d’affaires strictement positif, une durée et son unité.
Pour une date, exiger aussi le début de période et la convention de calendrier.
Si le délai dépasse la période, indiquer « seuil non atteint sur la période » ;
ne pas annoncer une date future sans données supplémentaires.
Avec une répartition non uniforme fournie, repérer le premier cumul de marge
sur coûts variables couvrant les coûts fixes de la période. Ne pas interpoler
entre deux observations sans hypothèse explicite. Sans répartition ni hypothèse
d’uniformité, ne pas calculer de point mort temporel.

## 6. Cas particuliers et contrôles

| Situation | Comportement attendu |
| --- | --- |
| Prix nul | Signaler l’absence de revenu par vente et appliquer le contrôle de contribution ; ne pas diviser par le prix |
| Coût variable égal au prix | Contribution nulle : avec des coûts fixes positifs, aucun volume ne permet de les couvrir |
| Coût variable supérieur au prix | Contribution négative : avec des coûts fixes positifs, aucun seuil atteignable en augmentant les ventes |
| Coûts fixes nuls, contribution positive | Seuil égal à zéro ; toute vente apporte une contribution positive |
| Coûts fixes et contribution nuls | Équilibre pour tout volume dans ce modèle ; aucun seuil unique par division, ne pas calculer 0/0 |
| Coûts fixes nuls, contribution négative | Équilibre uniquement à volume nul ; toute vente dégrade le résultat, ne pas annoncer un seuil rentable |
| Chiffre d’affaires nul | Taux de coûts variables, taux de marge de sécurité et point mort proportionnel non calculables ; la voie unitaire reste possible si ses entrées suffisent |
| Division par zéro | Ne pas effectuer la division ; expliquer quelle sortie est indisponible et pourquoi |
| Donnée indispensable manquante | Demander précisément la donnée ; fournir seulement les autres sorties calculables |
| Périodes incompatibles | Suspendre le calcul concerné ; demander des données harmonisées ou une règle de conversion explicitement fournie |
| Devises mélangées | Demander une devise commune ou un taux, une date et une convention de conversion explicitement fournis |
| Bases HT et TTC mélangées ou inconnues | Demander des montants sur une base cohérente ; ne pas supposer de taux ni de récupération de taxe |

Appliquer également les contrôles de contribution nulle ou négative au taux de
marge de la voie globale. Un seuil négatif issu d’une division ne constitue pas
un objectif de ventes exploitable.

Demander clarification pour les valeurs non numériques, non finies, négatives
ou contradictoires au regard du modèle simple. Ne pas corriger ni reclasser les
entrées silencieusement. Refuser toute sortie trompeuse et expliquer le blocage.

## 7. Arrondis

Distinguer explicitement :

```text
valeur_mathématique
nombre_minimum_entier_de_ventes
```

Pour un seuil valide et des ventes indivisibles, arrondir la valeur mathématique
à l’entier supérieur : 4,2 ventes signifie au minimum 5 ventes.
Ne jamais présenter 4,2 clients comme une quantité opérationnelle réalisable.
Pour des unités divisibles, demander le pas de vente avant un arrondi opérationnel.
Conserver la précision intermédiaire et annoncer la précision d’affichage des
montants. Ne pas confondre le seuil théorique avec le chiffre d’affaires du
nombre entier minimum de ventes.

## 8. Format d’analyse

Toute réponse importante suit cette structure :

1. **Données connues** : observations, provenance, période, unités et devise.
2. **Hypothèses** : hypothèses fournies et conditions du modèle explicitement retenues.
3. **Calcul** : formules utilisées et substitution des valeurs, avec unités.
4. **Résultat** : valeurs calculées, mode, arrondis et sorties indisponibles.
5. **Interprétation** : portée du seuil et de la marge de sécurité sur la période.
6. **Limites** : informations manquantes et conditions de validité.

Si une recommandation est formulée, la placer dans un paragraphe distinct
intitulé « Recommandation », séparé du résultat mathématique.

## 9. Analyse de sensibilité

Comparer les prix, coûts variables, coûts fixes ou volumes uniquement selon
les valeurs ou variations explicitement fournies. Identifier chaque scénario,
les paramètres modifiés et les paramètres maintenus. Utiliser une période,
une devise et une base de montants communes pour la comparaison.

Incorrect : « Simulons automatiquement une hausse de coûts de 20 %. »
Correct : « Hypothèse fournie : coûts +20 %. »

Ne pas choisir automatiquement de variation ni de scénario probable.
À prix et coûts inchangés, une variation de volume peut modifier la marge de
sécurité sans modifier le seuil. Signaler les scénarios non calculables.

## 10. Données réglementaires

Le sous-skill ne connaît pas lui-même les taux URSSAF, TVA, impôts ou autres
règles réglementaires. Aucune valeur réglementaire n’est codée dans ce contrat.

Ces éléments peuvent entrer comme coûts uniquement à partir d’une donnée
explicitement fournie ou d’une référence vérifiée. Identifier leur provenance,
leur période et leur qualification en coût fixe ou variable sans la deviner.
Une donnée fournie ne vaut pas validation réglementaire.

Les futures références réglementaires devront provenir du référentiel
[references/france/](../../references/france/sources.md), avec règle, période
d’application, statut de vérification, source officielle et date de vérification.
Une fiche non vérifiée ne permet pas de déduire un coût réglementaire.

## 11. Frontières

Le sous-skill ne doit pas :

- Faire de comptabilité officielle.
- Déterminer à lui seul un prix commercial optimal.
- Prévoir automatiquement les ventes futures.
- Estimer une demande de marché.
- Inventer un coût horaire, des frais fixes ou des coûts variables.
- Implémenter une logique CRM ou comptable.

Pour le prix commercial, orienter si pertinent vers
[tarification](../tarification/SKILL.md), en tenant compte de son état de préparation.
Un seuil calculé ne démontre ni la demande commerciale ni la disponibilité de trésorerie.

## 12. Sorties prévues

La sortie humaine suit le format d’analyse ci-dessus ; un tableau peut comparer
les scénarios. Toujours conserver les unités, le mode et les limites de validité.

Une future sortie structurée pourra contenir les champs conceptuels suivants :

```text
periode
mode
couts_fixes
prix_unitaire
cout_variable_unitaire
seuil_unites
nombre_minimum_entier_de_ventes
seuil_chiffre_affaires
marge_securite
point_mort
hypotheses
avertissements
```

Associer aux montants leur devise et leur base, aux entrées leur provenance,
et aux sorties indisponibles leur motif ; ne pas les remplacer par zéro.
Aucun format JSON ni mécanisme de sérialisation n’est implémenté à cette étape.

## 13. Tests fonctionnels futurs

- Seuil standard : cohérence des voies unitaire et globale sur les mêmes données.
- Coûts fixes nuls : distinction selon le signe de la contribution.
- Contribution unitaire nulle : absence de division par zéro.
- Contribution unitaire négative : absence de seuil de ventes trompeur.
- Nombre d’unités non entier : distinction entre valeur mathématique et minimum entier.
- Données manquantes : demande ciblée, aucune valeur inventée.
- Période incohérente : blocage jusqu’à harmonisation explicite.
- Scénario vs réel : provenance visible et fonctionnement sans historique.
- Marge de sécurité positive : dépassement du seuil correctement interprété.
- Marge de sécurité négative : manque de chiffre d’affaires correctement interprété.
- Prix ou chiffre d’affaires nul : seules les sorties valides sont produites.
- Devises ou bases HT/TTC mélangées : aucune conversion implicite.
- Point mort : données temporelles absentes, activité uniforme, répartition fournie et seuil non atteint.
- Offre récurrente : distinction entre unités facturées et clients distincts.
- Sensibilité : seules les variations fournies sont utilisées.

Ces cas décrivent les vérifications à réaliser plus tard ; aucun test exécutable
n’est ajouté et aucune validation d’un moteur n’est revendiquée.

## 14. Statut V1

Le contrat fonctionnel V1 est défini. Aucun moteur déterministe n’est encore
implémenté et aucun composant tiers n’est encore embarqué.

Une adaptation future du skill Open Accountant `break-even-calc` est envisagée.
Open Accountant n’est pas intégré ; aucun contenu tiers n’est repris dans ce fichier.
