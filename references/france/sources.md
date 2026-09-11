# Gestion des sources françaises — Méthode V1

## 1. Mission et périmètre

Ce fichier définit la méthode commune du référentiel France : traçabilité des règles, statuts de vérification, préférence entre sources, dates de consultation et d’application, traitement des contradictions et conservation de l’historique. Il empêche l’utilisation silencieuse d’une règle non vérifiée par les sous-skills.

Il ne contient aucune règle métier française validée, aucun taux, seuil, montant, durée ou obligation réelle. Les structures ci-dessous sont des modèles conceptuels à compléter, pas des données exploitables.

## 2. Principe fondamental

Toute donnée réglementaire ou administrative susceptible d’évoluer doit répondre aux questions suivantes :

```text
Quelle est la valeur ou la règle ?
À quelle période s’applique-t-elle ?
À quelle activité ou situation s’applique-t-elle ?
Quelle est sa source ?
Quand a-t-elle été vérifiée ?
Quel est son statut ?
```

Si ces éléments manquent, la règle n’est pas exploitable automatiquement. Ne jamais inventer une valeur, extrapoler une ancienne valeur ou remplacer une information absente par zéro.

## 3. Modèle minimal d’une règle

```yaml
id:
juridiction: FR
categorie:
intitule:
valeur:
unite:
date_debut:
date_fin:
statut:
source_officielle:
url:
date_source:
date_verification:
champ_application:
notes:
```

`id` identifie une version de règle. `valeur` peut être une donnée numérique ou un énoncé textuel. `source_officielle` doit permettre de retrouver l’organisme, le titre et la référence précise, ainsi que le passage ou la version consultés lorsque nécessaire.

Certains champs peuvent être non applicables selon la nature de la règle, par exemple `unite` pour un énoncé textuel. Documenter dans `notes` la distinction entre « non applicable », « inconnu » et « à vérifier ». Un champ vide dans un modèle ne constitue jamais une vérification ni une autorisation d’inventer une donnée. L’absence d’un élément nécessaire à l’usage bloque cet usage.

## 4. Statuts autorisés

| Statut | Définition | Conséquence pour l’utilisation |
| --- | --- | --- |
| `verified` | Règle vérifiée à partir d’une source officielle applicable à la période et au périmètre concernés. | Utilisable seulement après les contrôles de période, de périmètre et de contradiction. |
| `needs_review` | Information trouvée mais nécessitant encore confirmation, notamment en cas de contradiction. | Ne pas utiliser comme fait applicable ; expliquer le point à vérifier. |
| `superseded` | Ancienne règle conservée pour l’historique mais remplacée. | Jamais pour une date postérieure à sa période ; un usage historique exige les preuves de sa vérification pour la date étudiée. |
| `unknown` | Information insuffisante pour établir la règle. | Bloquer la conclusion qui en dépend et signaler l’information manquante. |
| `scheduled` | Règle annoncée ou adoptée mais pas encore entrée en vigueur. | Présenter uniquement comme future, avec son degré de confirmation ; jamais comme règle actuelle. |

Le statut est celui d’une version documentée, pas une garantie permanente. Le seul passage du temps ne transforme pas `scheduled` en `verified` : une nouvelle vérification et une trace de transition sont nécessaires. Une règle précédemment `verified` doit passer à `needs_review` si un doute pertinent apparaît.

## 5. Hiérarchie de préférence des sources

Ordre de recherche recommandé, à adapter au sujet et au champ de compétence :

1. Texte normatif applicable.
2. Documentation officielle de l’administration compétente.
3. BOFiP pour les sujets fiscaux lorsque pertinent.
4. URSSAF pour les cotisations et sujets sociaux relevant de son périmètre.
5. impots.gouv.fr.
6. Service-Public / Entreprendre.Service-Public.
7. economie.gouv.fr.
8. Documentation secondaire uniquement comme aide ou signal.

Cette liste est une préférence méthodologique, pas une règle absolue de résolution des conflits ni une détermination de la portée juridique de chaque publication. Certaines catégories se recoupent ; examiner la nature du document, sa date, sa version et son champ d’application.

Une source officielle peut être obsolète, non mise à jour ou encore accessible malgré le remplacement de la règle. Sa présence sur un site officiel et sa simple accessibilité ne prouvent pas son applicabilité. Vérifier systématiquement la période et le périmètre couverts.

## 6. Source primaire et source secondaire

Une **source primaire** est un texte ou une publication officielle directement applicable au sujet étudié. Une **source secondaire** est un document explicatif, une synthèse ou un guide ; elle peut aussi être publiée par un organisme officiel.

Une source secondaire aide à comprendre ou à découvrir une règle. Elle ne remplace pas silencieusement une source primaire lorsqu’une vérification juridique ou réglementaire précise est nécessaire.

Les projets tiers, articles, blogs, forums, assistants IA et bibliothèques peuvent suggérer des pistes ou aider à retrouver une source officielle. Ils ne deviennent pas automatiquement la source normative du référentiel. Une source non officielle ne peut pas être l’unique base de validation d’une règle critique.

## 7. Dates et période d’application

Distinguer, lorsque pertinent :

| Date | Signification et correspondance |
| --- | --- |
| `date_publication` | Publication du document ; ne prouve pas le début d’application. |
| `date_mise_a_jour` | Modification annoncée du document source. |
| `date_entree_en_vigueur` | Entrée en vigueur de la règle ; correspond à `date_debut` pour la version et le périmètre documentés. |
| `date_fin_application` | Dernière date d’application connue ; correspond à `date_fin`. |
| `date_consultation` | Date à laquelle la source a été consultée. |
| `date_verification` | Date à laquelle l’applicabilité a été examinée et le résultat enregistré. |

`date_source` dans le modèle minimal doit être qualifiée dans `notes` comme date de publication ou de mise à jour ; privilégier les champs distincts dans la fiche source. Une consultation ne suffit pas à établir une vérification réussie.

Utiliser le format `AAAA-MM-JJ` lorsque la date exacte est connue. Ne pas fabriquer de précision. La période est comprise entre `date_debut` et `date_fin`, bornes incluses ; documenter explicitement toute particularité d’application et subdiviser les versions si nécessaire.

Une règle peut être publiée avant son entrée en vigueur. Ne jamais confondre date de publication et date d’application, ni appliquer une règle à une période que sa source ne couvre pas.

### Sens de `date_fin: null`

```yaml
date_fin: null
```

Cela ne signifie pas « valable pour toujours ». Cela signifie uniquement qu’aucune date de fin n’était connue lors de la dernière vérification. Cette convention ne dispense pas de vérifier l’applicabilité à la date étudiée. Si aucune vérification n’a eu lieu, le signaler explicitement ; une borne vide ne démontre aucune validité.

## 8. Champ d’application et nature des règles

Chaque règle précise, lorsque pertinent, le type d’activité, le régime, la catégorie fiscale ou sociale, la nature de l’opération, la période et les conditions ou exclusions. Une information non applicable est justifiée ; une information inconnue nécessaire à la sélection de la règle bloque celle-ci.

Éviter une entrée générique telle que `cotisations = X`. Préférer une description contextualisée, sans valeur réelle :

```yaml
categorie:
activite:
periode:
taux:
conditions:
```

Le référentiel distingue les données numériques (seuil, taux, montant) des règles textuelles (obligation, condition, événement déclencheur, délai). Ne pas forcer un énoncé dans un format numérique ; conserver les conditions et le sens de la règle avec sa valeur.

## 9. Fiche source recommandée

Modèle vide : aucune source réelle n’est enregistrée par ce bloc.

```yaml
source_id:
organisme:
titre:
url:
type_source:
date_publication:
date_mise_a_jour:
date_consultation:
juridiction: FR
sujets:
notes:
```

`source_id` est un identifiant stable. `type_source` distingue primaire et secondaire ; consigner aussi le caractère officiel ou non dans les métadonnées ou les notes. Conserver la référence précise, le passage pertinent et la version consultée dans `notes` ou dans des champs complémentaires explicites.

Ne jamais inventer d’URL, de titre de page, de référence légale, de numéro d’article ou de date. Laisser l’information incomplète et qualifier son état si elle n’est pas vérifiée. Si une URL est nécessaire pour retrouver la preuve et manque, la fiche reste insuffisante ; pour un document sans URL, documenter un autre moyen précis de retrouver la source et justifier cette absence.

## 10. Fiche règle recommandée

Modèle vide : aucune règle réelle n’est enregistrée par ce bloc.

```yaml
rule_id:
categorie:
intitule:
type:
valeur:
unite:
champ_application:
date_debut:
date_fin:
statut:
source_ids:
date_verification:
notes:
```

`rule_id` correspond à `id` du modèle minimal : un même identifiant de version, pas deux identités concurrentes. `type` distingue `numerique` et `textuelle`. La juridiction est `FR`, à conserver explicitement si la fiche est extraite du référentiel France.

`source_ids` pointe vers une ou plusieurs fiches sources et remplace leur répétition dans `source_officielle`, `url` et `date_source`. Les liens doivent permettre de retrouver la preuve précise de cette version. Les deux modèles décrivent la même exigence de traçabilité ; éviter des copies divergentes.

## 11. Données calculées

Une valeur calculée n’est pas une règle source ni une valeur officielle publiée. La distinguer conceptuellement ainsi :

```text
source = regle_officielle
statut = verified

versus

source = calcul
dependances = [...]
```

Le premier cas suppose une vérification effective ; ce n’est pas un statut à préremplir. Pour un calcul, conserver la formule, les données d’entrée, les identifiants de version des règles dépendantes, la période et les hypothèses. Vérifier chaque dépendance pour le périmètre étudié. Une dépendance manquante, non vérifiée ou contradictoire empêche de présenter le résultat comme établi ; tout scénario reste explicitement hypothétique.

## 12. Historisation et mises à jour

Lorsqu’une règle change, conserver l’ancienne valeur et ses sources, lui attribuer une date de fin si elle est connue, la marquer `superseded` lorsque pertinent et créer une nouvelle entrée avec sa propre période. Relier les versions pour retrouver la succession de la même règle.

Exemple fictif de périodes, sans valeur métier ni preuve de validation réelle :

```yaml
- id: EXEMPLE_OLD
  date_debut: 2025-01-01
  date_fin: 2025-12-31
  statut: superseded

- id: EXEMPLE_NEW
  date_debut: 2026-01-01
  date_fin: null
  statut: verified
```

Ces entrées abrégées illustrent uniquement l’historisation ; elles ne sont pas exploitables et ne remplacent pas les fiches complètes.

Lors d’un réexamen, documenter ce qui a changé, mettre à jour `date_verification` et conserver les résultats antérieurs. Si seul le contrôle est renouvelé, ajouter une trace sans inventer une nouvelle période. Si le contenu ou l’applicabilité change, préserver l’ancienne période et créer la version correspondante. Ne pas écraser silencieusement l’historique, y compris lors d’une future automatisation.

## 13. Journal des vérifications

Chaque vérification enregistre au minimum :

- La date du contrôle.
- La source consultée, sa version ou son passage précis, et la règle concernée.
- Le résultat, y compris un échec ou une information insuffisante.
- Toute contradiction constatée, ou l’absence de contradiction identifiée lors du contrôle.
- Le statut retenu et sa justification.

Conserver chaque événement successif, les changements de statut et les motifs de résolution. `date_verification` reflète le dernier examen, même non concluant ; seul le statut accompagné de sa preuve permet d’en comprendre le résultat. Le journal conserve les preuves de vérification des anciennes versions.

## 14. Contradictions entre sources

Lorsque deux sources fiables au moins semblent se contredire :

1. Conserver les deux références et les passages en contradiction.
2. Comparer leurs dates de publication, de mise à jour et d’application.
3. Vérifier leurs champs d’application et leurs conditions.
4. Vérifier si une référence a été remplacée ou recodifiée.
5. Rechercher le texte applicable à la période et à la situation.
6. Marquer la règle `needs_review` tant que le conflit reste non résolu.
7. Empêcher toute conclusion automatique dépendant de cette règle.

Ne jamais choisir arbitrairement la valeur la plus récente ou celle qui paraît plausible. Documenter la résolution, ses preuves et le statut résultant, sans effacer les références ni la contradiction initiale. Si le conflit nécessite une interprétation juridique dépassant la simple vérification, transmettre le point au sous-skill juridique ou à un professionnel compétent.

## 15. Règles futures et changements de référence

Une règle future conserve sa date prévue d’entrée en vigueur si connue, sa source et le statut `scheduled`. Distinguer une annonce d’une adoption et documenter toute incertitude de calendrier ou de contenu. En l’absence de date fiable, la laisser inconnue ; ne pas en déduire une application immédiate.

```text
applicable maintenant
≠
prévue plus tard
```

Une règle `scheduled` ne devient pas actuelle automatiquement à la date annoncée. Vérifier son entrée en vigueur effective, ses éventuelles modifications et son périmètre avant de changer son statut. Son utilisation dans un scénario futur doit rester explicitement conditionnelle.

En cas de recodification ou de changement de référence, prévoir :

```yaml
reference_historique:
reference_actuelle:
```

Conserver les preuves de correspondance et les dates pertinentes. Ne pas créer artificiellement deux obligations distinctes pour une simple recodification ; vérifier si le contenu est réellement inchangé avant de relier les références. Si le contenu change, historiser les versions de règle.

## 16. Utilisation par les sous-skills

Avant toute utilisation automatique, vérifier cumulativement :

- La complétude des informations nécessaires et la traçabilité de la preuve.
- Un statut compatible avec l’usage : `verified` pour une règle applicable, ou `superseded` uniquement pour un usage historique dont la vérification est documentée.
- Une période couvrant la date étudiée, sans prolongation supposée.
- Un champ d’application correspondant à la situation et à ses conditions.
- L’absence de contradiction non résolue et de doute identifié sur l’actualité de la preuve.

Une règle `needs_review` ou `unknown` ne peut pas servir de fait applicable. Une règle `scheduled`, notamment hors période, ne peut pas servir de règle actuelle ; elle reste réservée à une présentation future conditionnelle jusqu’à sa vérification. Une règle `superseded` ne peut pas être utilisée pour une date postérieure à sa période.

Si une condition échoue, signaler la règle bloquée, son statut et la vérification supplémentaire nécessaire. Poursuivre seulement les parties indépendantes de l’analyse. Ne pas masquer le blocage par une hypothèse présentée comme une règle vérifiée. La date de dernière vérification ne constitue pas, seule, une garantie d’actualité ; réexaminer la source lorsque la date étudiée ou de nouveaux éléments l’exigent.

## 17. Références croisées

Les fiches suivantes utilisent cette méthode :

- [Micro-entreprise](micro-entreprise.md).
- [Livre des recettes](livre-recettes.md).
- [TVA](tva.md).
- [Cotisations sociales](cotisations-sociales.md).
- [Facturation](facturation.md).
- [Facturation électronique](facturation-electronique.md).

Chaque fiche doit pointer vers les sources enregistrées et la version de règle concernée, ou reproduire suffisamment d’informations pour retrouver précisément la source, le passage, la période et la vérification. Un lien générique vers un organisme ne suffit pas. La présence d’une fiche ou d’un lien ne valide pas son contenu.

## 18. Contrôles futurs

Prévoir des contrôles conceptuels détectant :

- Une règle sans source ou dont les identifiants de source ne se résolvent pas.
- Une règle sans période suffisamment établie pour l’usage demandé.
- Une source sans URL lorsque celle-ci est nécessaire.
- Un conflit ou un chevauchement incohérent de périodes pour un même périmètre.
- Deux règles `verified` incompatibles sur la même période et le même périmètre.
- Une règle `scheduled` utilisée trop tôt ou assimilée automatiquement à une règle actuelle.
- Une règle `superseded` utilisée pour une date plus récente que sa période.
- Une source non officielle utilisée comme unique base d’une règle critique.
- Une contradiction non résolue, un statut absent ou une vérification non traçable.
- Un calcul présenté comme une valeur officielle ou reposant sur des dépendances non exploitables.

Ces contrôles sont des exigences pour une future implémentation, pas des fonctionnalités existantes. Un chevauchement entre périmètres distincts ne démontre pas, à lui seul, une contradiction.

## 19. Frontières

Ce fichier ne donne pas de conseil juridique personnalisé, ne décide pas de l’interprétation finale d’un texte ambigu et ne certifie pas la conformité. Il n’autorise ni l’invention d’une source ou d’une valeur, ni la substitution à un sous-skill juridique ou à un professionnel compétent lorsque l’interprétation dépasse le simple usage d’une règle vérifiée.

En l’absence de source suffisante, retenir `unknown` ou `needs_review` selon les informations disponibles et signaler la vérification nécessaire. Ne pas inventer de donnée et ne pas extrapoler une ancienne valeur.

## 20. Statut V1

La méthode de gestion des sources est définie. Aucune règle métier française n’est validée par ce fichier seul ; aucune source réelle ni règle réelle n’est ajoutée ici. Les autres fiches France restent à remplir et à vérifier. Aucun moteur de validation automatique n’est encore implémenté.
