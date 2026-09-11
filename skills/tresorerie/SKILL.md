---
name: tresorerie
description: Suivre, prévoir et simuler la trésorerie à partir de soldes et flux explicitement fournis, sans présenter une prévision comme certaine.
---

# Trésorerie — Contrat fonctionnel V1

## 1. Mission

Calculer un solde prévisionnel, organiser encaissements et décaissements par période, comparer des scénarios, identifier les périodes à risque et analyser l’impact d’une dépense ou d’un investissement. Distinguer trésorerie réelle et prévisionnelle, et préparer une décision sans présenter une prévision comme certaine.

## 2. Concepts à distinguer

**Solde réel** : montant observé à une date donnée, issu d’une source identifiée.

**Encaissement réalisé** et **décaissement réalisé** : flux effectivement reçu ou payé.

**Flux engagé** : flux futur rattaché à une facture émise, un contrat, un abonnement ou une échéance connue ; il n’est pas automatiquement encaissé ou payé à la date prévue.

**Flux attendu** : flux futur fondé sur une information explicite mais non réalisé.

**Flux hypothétique** : flux utilisé uniquement dans un scénario.

**Solde prévisionnel** : résultat calculé à partir d’un solde de départ et de flux futurs identifiés ; ne jamais le présenter comme un solde réel.

**Réserve de trésorerie** : objectif ou contrainte éventuelle ; ne jamais inventer une réserve minimale.

## 3. Modes de fonctionnement

**Mode réel** : flux réalisés et solde observé uniquement.

**Mode prévision** : flux futurs identifiés par leur niveau de certitude.

**Mode scénario** : hypothèses explicitement fournies, même sans historique. Une donnée réelle utilisée dans un scénario reste identifiée comme réelle ; le résultat reste un scénario.

## 4. Niveau de qualification des flux

```text
engage
attendu
hypothetique
```

Ne pas inventer de probabilité, convertir un devis en encaissement, un prospect en chiffre d’affaires, ou une facture émise en trésorerie disponible.

## 5. Données possibles

Entrées possibles : dates de début et de fin, périodicité, solde de départ, encaissements et décaissements réalisés ou futurs, date prévue, montant, devise, base HT/TTC lorsque pertinente, catégorie, référence, qualification, flux récurrent, fréquence, date de fin éventuelle et réserve cible fournie.

Ne pas exiger toutes les données pour chaque analyse. Chaque entrée retenue indique sa provenance et son statut ; chaque flux indique montant, devise, date, catégorie et référence. Ne jamais remplacer une donnée absente par zéro.

## 6. Formule fondamentale

```text
solde_cloture
= solde_ouverture
+ encaissements
- decaissements
```

Pour plusieurs périodes :

```text
solde_ouverture_periode_n
= solde_cloture_periode_n-1
```

Chaque période conserve la traçabilité de ses flux.

## 7. Flux récurrents

Projeter un flux récurrent seulement si montant, fréquence, date de début et, lorsque nécessaire, date de fin ou règle d’arrêt sont fournis. Ne pas supposer de renouvellement indéfini ni de conservation d’un client. Distinguer engagement contractuel, hypothèse de renouvellement et scénario.

## 8. Dates d’encaissement et de paiement

Ne jamais déduire arbitrairement une date. Une facture émise n’est pas automatiquement encaissée le même jour. Conserver une échéance connue comme date prévue. Sans date, présenter le flux comme « date inconnue » et ne pas l’intégrer temporellement sans hypothèse explicite.

## 9. Prévision sans historique

```text
solde de départ
+
encaissements explicitement prévus
-
décaissements explicitement prévus
```

La V1 peut fonctionner ainsi sans moyenne mobile, saisonnalité, tendance, croissance ou extrapolation de ventes. Les méthodes statistiques sont ultérieures.

## 10. Scénarios

Comparer des scénarios prudent, central ou haut seulement si leurs hypothèses sont fournies. Ces noms ne créent aucune valeur. Chaque scénario liste hypothèses propres, données communes, flux ajoutés ou modifiés et résultat par période.

## 11. Risque de trésorerie négative

```text
solde_previsionnel < 0
```

Signaler ce résultat comme risque ou situation négative dans le scénario concerné. Si des flux sont hypothétiques, ne pas l’annoncer comme certain. Préciser première période, déficit prévisionnel, qualification des flux responsables et hypothèses.

## 12. Réserve de trésorerie

Ne pas appliquer automatiquement une règle telle que « réserve = 2 mois de dépenses ». La réserve peut être fournie, issue d’une politique interne identifiée, ou calculée par une règle explicitement fournie. Comparer alors le solde prévisionnel à cette réserve.

## 13. Impact d’un investissement ou d’une dépense

Calculer, lorsque les données le permettent, solde avant dépense, montant, solde après dépense, périodes affectées, passage éventuel sous zéro ou sous réserve. Ne pas qualifier automatiquement un investissement d’« abordable ».

## 14. Créances et chiffre d’affaires

```text
chiffre_affaires
facture_emise
creance
encaissement
tresorerie
```

Ces notions ne sont pas interchangeables. Chiffre d’affaires calculé ou facture émise ne sont pas automatiquement de la trésorerie disponible.

## 15. Cotisations, impôts et autres obligations

Le sous-skill ne connaît pas directement les taux URSSAF, TVA, impôts, échéances réglementaires ou prélèvements légaux. Ces flux sont admis seulement s’ils sont explicitement fournis ou proviennent ultérieurement d’une référence vérifiée dans [references/france/](../../references/france/). Aucune valeur réglementaire n’est codée dans ce fichier.

## 16. HT, TTC et trésorerie

Pour un flux bancaire réel, utiliser le montant effectivement encaissé ou décaissé. Pour une prévision, préciser HT ou TTC ; ne pas convertir sans règle applicable et vérifiée, ni supposer que la TVA est une ressource disponible. Renvoyer au référentiel France vérifié lorsque nécessaire.

## 17. Multi-devise

Ne pas additionner des devises différentes. Une conversion exige un taux de change, une date ou convention et une devise cible explicitement fournis.

## 18. Cas particuliers et contrôles

| Situation | Comportement attendu |
| --- | --- |
| Solde de départ absent | Demander le solde observé ou une hypothèse ; ne pas calculer un solde chaîné. |
| Montant non numérique ou non fini, date invalide | Refuser la donnée et demander correction. |
| Date hors période ou flux sans date | Ne pas l’affecter automatiquement ; le présenter comme non intégré temporellement. |
| Doublon potentiel | Signaler le risque et demander une référence ou décision explicite. |
| Encaissement ou décaissement négatif | Demander une requalification explicite ; ne pas l’interpréter automatiquement. |
| Devise ou périodes incohérentes | Suspendre le calcul concerné jusqu’à harmonisation explicite. |
| Flux récurrent sans fréquence ou règle d’arrêt nécessaire | Ne pas le projeter. |
| Solde prévisionnel négatif | Signaler le risque avec période, déficit, qualifications et hypothèses. |
| Réserve cible absente | Ne pas inventer de seuil ; fournir seulement le solde calculable. |

Ne pas corriger silencieusement les données.

## 19. Annulation, remboursement et correction

Ne pas utiliser silencieusement un encaissement ou décaissement négatif. Prévoir conceptuellement les catégories remboursement, annulation, correction, avoir et régularisation ; leur traitement précis est ultérieur.

## 20. Périodicité

Permettre conceptuellement jour, semaine et mois selon les données disponibles. Ne pas agréger à une granularité plus fine que les dates fournies. Le mois peut être courant en V1 sans devenir une règle absolue.

## 21. Format d’analyse

```text
Données connues
Engagements connus
Hypothèses
Période
Calcul
Projection
Risques
Limites
```

Une éventuelle « Recommandation » est distincte de la prévision.

## 22. Sortie tabulaire

Prévoir conceptuellement une sortie humaine par période avec solde d’ouverture, encaissements réalisés, engagés/attendus et hypothétiques, décaissements réalisés, engagés/attendus et hypothétiques, solde de clôture, réserve cible et écart à la réserve. Aucun tableur ni script n’est implémenté.

## 23. Sortie structurée future

```text
mode
periode
devise
solde_ouverture
encaissements
decaissements
solde_cloture
reserve_cible
ecart_reserve
flux
hypotheses
avertissements
```

Chaque flux conserve référence, date, montant, catégorie, qualification et origine. Aucun JSON n’est implémenté.

## 24. Frontières

Ne pas prévoir automatiquement ventes, croissance, saisonnalité ou probabilité d’encaissement ; déterminer un taux réglementaire ; faire rapprochement bancaire ou comptabilité officielle ; décider seul d’un investissement ; traiter devis ou facture comme cash ; ni supposer le renouvellement d’un abonnement.

Pour la rentabilité : [seuil-rentabilite](../seuil-rentabilite/SKILL.md). Pour le prix : [tarification](../tarification/SKILL.md).

## 25. Tests fonctionnels futurs

- Solde simple, périodes chaînées et scénario sans historique.
- Flux engagé, attendu et hypothetique ; facture non encaissée et flux sans date.
- Solde prévisionnel négatif ; réserve fournie ou absente.
- Investissement sous zéro ou sous réserve seulement.
- Flux récurrent borné et renouvellement non fourni.
- Devise, montant, date et HT/TTC incohérents.
- Absence de solde de départ et comparaison de scénarios.

Ces cas seront testés ultérieurement ; aucun test exécutable ni moteur n’est ajouté.

## 26. Statut V1

Le contrat fonctionnel V1 est défini. Aucun moteur déterministe ni prévision statistique n’est encore implémenté, et aucun composant tiers n’est embarqué. Open Accountant `cash-flow-forecast` est seulement envisagé comme source d’adaptation future ; aucun contenu tiers n’est repris dans ce fichier.
