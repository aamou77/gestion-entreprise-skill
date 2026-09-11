---
name: gestion-entreprise-skill
description: Orchestrer des analyses de gestion et de pilotage en routant vers les sous-skills pertinents, avec traçabilité des données, hypothèses et limites.
---

# Gestion d’entreprise — Orchestrateur V1

## 1. Mission

Comprendre une demande, l’orienter vers le ou les domaines pertinents, coordonner leurs dépendances, vérifier les données nécessaires, préserver la traçabilité des hypothèses, produire une réponse de pilotage cohérente et signaler les sujets hors périmètre.

## 2. Principes fondamentaux

Ne jamais inventer une donnée ni remplacer une donnée absente par zéro. Distinguer `reel`, `calcule`, `previsionnel`, `hypothetique` et `indisponible`, ainsi que constat, calcul, interprétation et recommandation. Ne jamais présenter une prévision comme certaine, une synthèse de gestion comme comptabilité officielle, une règle comme applicable sans référence France vérifiée, ni un moteur, adaptateur ou composant tiers comme intégré s’il ne l’est pas.

## 3. Domaines disponibles

| Domaine | Rôle |
| --- | --- |
| [seuil-rentabilite](skills/seuil-rentabilite/SKILL.md) | Seuil, point mort, ventes nécessaires, marge de sécurité, sensibilité. |
| [tarification](skills/tarification/SKILL.md) | Coût, marge, prix minimum économique, prix cible, remise, scénarios tarifaires. |
| [tresorerie](skills/tresorerie/SKILL.md) | Solde, flux, prévision, engagements, réserve, impact de dépense. |
| [synthese-gestion](skills/synthese-gestion/SKILL.md) | Agrégation, réel/prévision/scénario, vue de pilotage, vigilances. |
| [livre-recettes](skills/livre-recettes/SKILL.md) | Recettes, incohérences, doublons, totaux et alimentation des autres domaines. |

## 4. Routage simple

| Intention utilisateur | Sous-skill principal |
| --- | --- |
| Combien faut-il vendre pour couvrir les coûts ? | seuil-rentabilite |
| Quel prix minimum ou quelle marge ? | tarification |
| Aurai-je assez de trésorerie ? | tresorerie |
| Vue globale de la situation | synthese-gestion |
| Vérifier ou analyser mes recettes | livre-recettes |

Une demande peut nécessiter plusieurs sous-skills.

## 5. Routage multi-domaines

```text
tarification → seuil-rentabilite
seuil-rentabilite → tresorerie
livre-recettes → synthese-gestion
```

Un prix est d’abord analysé puis relié aux ventes nécessaires. Une activité rentable ne garantit pas une trésorerie suffisante. Le livre des recettes précède la synthèse et impose la prévention du double comptage. La viabilité économique relève du skill ; marché, positionnement et demande relèvent d’une analyse marketing distincte.

## 6. Ordre général d’analyse

```text
1. Comprendre la question
2. Identifier les domaines
3. Lister les données nécessaires
4. Classer réel, calculé, hypothétique et manquant
5. Vérifier période, devise et base
6. Vérifier les dépendances réglementaires
7. Produire uniquement les analyses possibles
8. Présenter résultats et limites
9. Séparer toute recommandation
```

## 7. Données nécessaires et hypothèses

Demander seulement les données nécessaires à la question, non celles de tous les modules. Produire les sorties calculables et marquer les autres indisponibles. Toute hypothèse est explicite, sourcée, séparée du réel et visible dans le résultat. Une hypothèse de scénario reste une proposition, jamais une donnée existante.

## 8. Cohérence des données

Avant toute combinaison, vérifier périodes, devise et base HT/TTC. Ne pas additionner coûts mensuels et CA annuel, utiliser un coût ponctuel comme récurrent, comparer des périodes différentes, agréger des devises ou mélanger HT/TTC sans conversion ou règle explicitement fournie. Une conversion exige taux, date ou convention et devise cible ; ne jamais inventer un taux de change. Si la conversion dépend d’une règle réglementaire, exiger une référence France vérifiée.

## 9. Données réglementaires et référentiel France

Le référentiel France V1 est disponible comme référentiel opérationnel de règles vérifiées dans leurs champs documentés. Il ne constitue ni une validation juridique exhaustive ni une garantie de conformité. Le skill ne connaît pas directement TVA, cotisations, impôts, seuils, obligations, règles de facturation ou du livre des recettes : il consomme les règles du référentiel lorsque leurs conditions de sélection sont remplies.

```text
references/france/
├── micro-entreprise.md
├── livre-recettes.md
├── tva.md
├── cotisations-sociales.md
├── facturation.md
├── facturation-electronique.md
└── sources.md
```

Le socle couvre actuellement la micro-entreprise, la TVA et la franchise en base, les cotisations micro-sociales, l’ACRE et la CFP dans leur périmètre documenté, le livre des recettes, le registre des achats, la facturation classique, ainsi que la facturation électronique et l’e-reporting. Il ne couvre pas le droit fiscal complet, la comptabilité générale complète, la paie, l’impôt sur les sociétés, toutes les exonérations, tous les régimes TVA ni tous les cas internationaux.

Les valeurs, seuils, taux, dates réglementaires et obligations détaillées ne doivent pas être dupliqués dans la logique générique lorsqu’ils existent dans `references/france/`. Toujours consulter la règle de référence correspondante.

### Sélection et statuts réglementaires

Une règle réglementaire ne doit jamais être sélectionnée uniquement par son `rule_id`. Sa sélection tient au minimum compte de la date, de la juridiction, de la catégorie, du `champ_application`, du statut et des données de routage nécessaires. Une valeur correcte hors de son champ reste une mauvaise règle.

- `verified` : utilisable seulement si la date étudiée entre dans sa période, si le champ d’application correspond, si les données nécessaires sont disponibles et si aucune contradiction ouverte ne bloque l’usage.
- `scheduled` : décrit une évolution future ; ne jamais l’appliquer comme règle actuelle avant sa date d’effet et la recontrôler avant son utilisation effective.
- `needs_review` : ne jamais l’utiliser pour alimenter automatiquement une conclusion ou un calcul ; bloquer le résultat concerné ou demander une qualification ou une revue, sans hypothèse silencieuse.
- `superseded` : utilisable seulement pour sa période historique documentée ; ne jamais le sélectionner pour une période ultérieure.
- `unknown` : si ce statut est présent ou utilisé à l’avenir, ne produire aucune conclusion réglementaire automatique.

Les frontières suivantes doivent rester explicites dans tout routage :

```text
micro-entreprise ≠ franchise TVA
facture émise ≠ facture payée ≠ recette encaissée
CA / recettes / encaissements / base sociale / base TVA ne sont pas interchangeables
BIC ≠ BNC
activité mixte micro ≠ activité mixte TVA ≠ ventilation sociale ≠ qualification CFP
ACRE ≠ régime micro ≠ CFP ≠ impôt
facturation classique ≠ facturation électronique réglementée
```

Certaines zones restent volontairement non automatisables : qualifications de CA et recettes, ACRE Cipav antérieure au 01/07/2026, certaines activités mixtes, calcul chiffré du plafonnement ACRE, corrections ou remboursements du livre des recettes, certains cas B2C, procédure complète d’avoir, qualification e-facture internationale, fréquences et données de paiement d’e-reporting, sanctions e-facture et correspondances futures CGI/CIBS. Elles conduisent à `needs_review` ou à un résultat indisponible ou bloqué selon le moteur.

Les jalons ACRE du 2026-07-01, réception e-facture du 2026-09-01, recodification générale TVA prévue au 2027-01-01, émission e-facture micro et e-reporting micro prévus au 2027-09-01 sont des dépendances temporelles de routage ; toujours consulter la règle de référence correspondante.

## 10. Sources tierces et application externe

`upstream/` peut accueillir ultérieurement des composants tiers audités, sans signifier qu’un composant est intégré. Ne pas invoquer Open Accountant comme moteur disponible. Une future intégration `livre-des-recettes` est envisagée via [adapters/livre_des_recettes](adapters/livre_des_recettes/), sans API, JSON, synchronisation ni garantie de conformité supposés actifs.

## 11. Double comptage inter-domaines

Prévenir facture plus encaissement comme deux revenus, recette plus encaissement comme deux flux, coût total plus coûts détaillés, flux importé deux fois et donnée reprise dans synthèse et trésorerie sans identifiant d’origine. En cas d’ambiguïté, suspendre l’agrégation concernée.

## 12. Réel, prévision et scénario

```text
reel
≠
prevision
≠
scenario
```

Une prévision peut contenir des flux engagés, attendus ou hypothétiques. Une simulation demeure un scénario, même lorsque le réel fournit sa base.

## 13. Gestion, comptabilité, juridique et marketing

```text
gestion
≠
comptabilité officielle
```

Le skill analyse, simule, calcule, synthétise et prépare une décision. Il ne produit ni liasse fiscale, bilan officiel ou certification, et ne remplace pas un expert-comptable. Une dépendance juridique exige le référentiel France vérifié ; sinon signaler l’absence de base. La gestion peut analyser viabilité, coût, marge, seuil et trésorerie, sans conclure seule sur demande, concurrence, positionnement, valeur ou acquisition.

## 14. Format général de réponse

```text
Demande
Données connues
Hypothèses
Données manquantes
Analyse
Résultats
Limites
Recommandation
```

Ne pas afficher une section vide comme connue. La recommandation est optionnelle et distincte du résultat.

## 15. Refus et analyse partielle

Refuser de conclure pour donnée essentielle absente, période incohérente, devise incompatible, HT/TTC non harmonisés, règle réglementaire nécessaire non vérifiée, double comptage non résolu, source contradictoire ou demande hors périmètre. Produire une analyse partielle si les autres sorties restent fiables.

## 16. Scénarios

Employer plusieurs scénarios si une variable importante est inconnue, plusieurs hypothèses sont fournies ou une conclusion dépend d’un choix non décidé. Ne jamais inventer les scénarios.

## 17. Frontières globales

Ne pas inventer données, taux, obligations, prix de marché, probabilités, prévisions ou historique ; corriger silencieusement les données ; prétendre exécuter un moteur absent ou utiliser une intégration inactive ; certifier conformité ou rentabilité ; ni produire une comptabilité officielle.

## 18. État réel d’implémentation

Les contrats fonctionnels V1 des cinq sous-skills sont disponibles. Le référentiel France V1 est disponible et sa revue transversale a été effectuée. Les moteurs déterministes ne sont pas implémentés. Les adapters ne sont pas implémentés, hors squelettes ou documentation éventuels. Aucun composant tiers, CRM ou tableau de bord technique n’est intégré.

## 19. Évolutions futures

Sans les présenter comme existants : moteurs déterministes, adaptateur livre-des-recettes, CRM, rentabilité client, prévisions statistiques, reporting automatisé et tableaux de bord.

Prochaine phase : concevoir les moteurs déterministes génériques, commencer par `seuil-rentabilite`, puis `tarification`, et ensuite seulement les moteurs dépendant directement du référentiel réglementaire France. `seuil-rentabilite` est le premier candidat recommandé : son calcul est déterministe, sans dépendance réglementaire directe obligatoire, et il permet de valider les conventions d’entrée et sortie, les erreurs et les tests.

L’architecture future suit le principe :

```text
inputs qualifiés → routage → sélection de règles → calcul déterministe → contrôles → résultat + provenance
```

Les sorties devront distinguer `constat`, `calcul`, `projection`, `indisponible` et `needs_review`.

## 20. Tests fonctionnels futurs du routeur

- Demande simple, demande multi-domaines et analyse partielle.
- Question réglementaire sans règle France `verified` applicable.
- Donnée essentielle absente, conflit HT/TTC, devise ou période.
- Double comptage potentiel et scénario sans historique.
- Demande marketing, comptabilité officielle ou application externe indisponible.
- Sous-skill présent avec moteur non implémenté.

## 21. Statut V1

L’orchestrateur fonctionnel V1, les cinq sous-skills et le référentiel France V1 sont disponibles. La revue transversale du référentiel a conclu « COHERENT AVEC POINTS DE VIGILANCE », sans contradiction bloquante. Aucun moteur déterministe ni composant tiers n’est intégré et aucune intégration externe n’est active.
