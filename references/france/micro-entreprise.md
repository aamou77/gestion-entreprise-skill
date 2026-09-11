# Micro-entreprise — Référentiel France V1 (2026)

## 1. Statut

Socle vérifié le **2026-09-09**, selon la [méthode commune de gestion des sources](./sources.md). Les statuts portent sur chaque règle et son champ, pas sur la conformité fiscale complète d’une entreprise.

Les plafonds sont documentés pour les années d’application 2026 à 2028. Les autres règles sont vérifiées pour l’étude du régime en 2026 : leur `date_debut` borne le périmètre temporel de cette fiche, sans prétendre dater leur création juridique. Pour ces règles, `date_fin: null` signifie qu’aucune fin n’est connue lors du contrôle, jamais une validité perpétuelle. Réexaminer leur applicabilité avant tout usage ultérieur.

Les dates de publication, de vérification éditoriale et de consultation sont distinctes. Les sources complémentaires ci-dessous servent à résoudre les incohérences repérées et à rattacher la méthode aux textes applicables. Aucun contenu de projet tiers n’est repris.

## 2. Périmètre

Cette fiche couvre les plafonds micro-BIC des ventes et prestations de services, le plafond micro-BNC des activités libérales, l’activité mixte ordinaire ventes/services, la logique N-1 / N-2, la sortie pour dépassements consécutifs, la création et la séparation micro/TVA.

Elle concerne les entrepreneurs dont l’activité relève effectivement du régime français étudié. L’éligibilité de l’activité, les exclusions légales, les options exercées et une éventuelle particularité territoriale doivent être identifiées avant utilisation. Le respect d’un plafond n’établit pas à lui seul l’éligibilité complète.

Les hébergements et locations spécifiques ne sont pas assimilés automatiquement aux ventes ou services. Les cas exclus et les articulations non documentées figurent en section 6.

Aucun taux de cotisations, dispositif ACRE, versement libératoire, seuil de franchise TVA, calcul d’impôt, obligation du livre des recettes ou règle de facturation n’est défini ici.

## 3. Sources

### Sources demandées

Les identifiants `source_id` sont les clés utilisées par les fiches règles. Les rubriques et paragraphes indiqués localisent les passages retenus ; une source n’est pas validée globalement par son enregistrement.

```yaml
- source_id: SRC_FR_MICRO_SERVICE_PUBLIC_2026
  organisme: Direction de l'information légale et administrative / Service Public Entreprendre
  titre: "Quelles conséquences pour un micro-entrepreneur qui dépasse les seuils de chiffre d'affaires ?"
  url: https://entreprendre.service-public.fr/vosdroits/F32353
  type_source: secondaire_officielle
  date_publication: null
  date_mise_a_jour: null
  date_verification_editoriale: 2026-02-21
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [plafonds, annees_reference, sortie, creation, prorata, activite_mixte]
  notes: >-
    La mention « Vérifié le » est une date éditoriale, pas notre consultation.
    Publication et mise à jour distinctes non identifiées.
    Redirection constatée vers https://entreprendre.service-public.gouv.fr/vosdroits/F32353.
    Passages retenus : seuils, première année, activité mixte et cessation du régime.
    Incohérence des années après création traitée en section 7.

- source_id: SRC_FR_MICRO_ECONOMIE_2026
  organisme: Ministère de l'Économie / Bercy infos Entreprises
  titre: "Micro-entreprise : que se passe-t-il quand le seuil de chiffre d'affaires est dépassé ?"
  url: https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/micro-entreprise-que-se-passe-t-il-quand-le-seuil-de-chiffre-daffaires-est-depasse
  type_source: secondaire_officielle
  date_publication: 2026-02-25
  date_mise_a_jour: null
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [plafonds_2026, activite_mixte, depassement, creation]
  notes: >-
    Date affichée sous la mention « Écrit le » ; mise à jour distincte inconnue.
    Confirmation complémentaire : changement des seuils en 2026 et dépassement.
    Les développements TVA ne sont pas importés. Les formulations relatives
    à l'hébergement ne sont pas généralisées au périmètre V1.

- source_id: SRC_FR_MICRO_BOFIP_2026
  organisme: Direction générale des Finances publiques / BOFiP-Impôts
  titre: "BAREME - BA - BIC - BNC - Seuils des régimes d’imposition (BA - BIC - BNC) et seuil de la dispense de bilan (BIC)"
  url: https://bofip.impots.gouv.fr/bofip/14069-PGP.html/identifiant=BOI-BAREME-000044-20260819
  type_source: primaire_publication_officielle
  date_publication: 2026-08-19
  date_mise_a_jour: 2026-08-19
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [plafonds_micro_BIC_2026_2028, plafond_micro_BNC_2026_2028, historique_BNC]
  notes: >-
    Version BOI-BAREME-000044 du 19 août 2026 ; date de début de publication
    de cette version. I-A § 1 : ventes ; I-C § 20 : autres entreprises,
    dont services ; III § 50 : BNC et historique 2023 à 2025.
    Publication administrative de barème, à distinguer d'un texte législatif.
    Les rubriques agricoles, locations spécifiques et autres régimes sont exclues.

- source_id: SRC_FR_MICRO_IMPOTS
  organisme: Direction générale des Finances publiques / impots.gouv.fr
  titre: Le régime unique des micro-entreprises
  url: https://www.impots.gouv.fr/professionnel/le-regime-unique-des-tpe
  type_source: secondaire_officielle
  date_publication: null
  date_mise_a_jour: null
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [distinction_micro_TVA]
  notes: >-
    Dates éditoriales non identifiées. Seul le passage consacré aux précisions
    en matière de TVA fonde une règle ici. La page présente encore d'anciens
    plafonds : observation consignée en section 7, sans les valider pour 2026.
```

### Compléments nécessaires au recoupement

Les deux articles du CGI permettent de contrôler la condition temporelle et les catégories dans le texte normatif. Les deux commentaires BOFiP, atteints depuis le barème demandé, précisent la revalorisation des seuils de référence et résolvent le décalage d’années de Service Public après création. Leur ajout répond à ces besoins précis.

```yaml
- source_id: SRC_FR_MICRO_CGI_50_0_20260701
  organisme: Légifrance
  titre: Article 50-0 du Code général des impôts
  url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054373853
  type_source: primaire_texte_normatif
  date_publication: null
  date_mise_a_jour: null
  date_debut_version: 2026-07-01
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [micro_BIC, annees_reference, plafonds, prorata, activite_mixte]
  notes: >-
    Identifiant LEGIARTI000054373853 récupéré par le connecteur Légifrance,
    version en vigueur depuis le 01/07/2026 et applicable au 09/09/2026.
    Fonction : conditions d'accès au régime, 1, et possibilité d'option, 4.
    Les dates éditoriales non établies restent nulles ; la date de version
    n'est pas assimilée au début d'application annuel des seuils du barème.
    Aucune règle de calcul d'impôt ou de tenue de livres n'est extraite.

- source_id: SRC_FR_MICRO_CGI_102_TER_20260701
  organisme: Légifrance
  titre: Article 102 ter du Code général des impôts
  url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054373747
  type_source: primaire_texte_normatif
  date_publication: null
  date_mise_a_jour: null
  date_debut_version: 2026-07-01
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [micro_BNC, annees_reference, plafond, prorata]
  notes: >-
    Identifiant LEGIARTI000054373747 récupéré puis vérifié par le connecteur
    Légifrance, version en vigueur depuis le 01/07/2026, applicable au 09/09/2026.
    Fonction : conditions du régime déclaratif spécial, 1, et option, 5.
    Les dates éditoriales non établies restent nulles. L'ancienne référence
    liée depuis Service Public n'est pas utilisée comme version actuelle.
    Les calculs d'impôt et les obligations documentaires ne sont pas extraits.

- source_id: SRC_FR_MICRO_BOFIP_REFERENCE_2026
  organisme: Direction générale des Finances publiques / BOFiP-Impôts
  titre: "BIC - Régimes d’imposition et obligations déclaratives - Chiffres d’affaires limites"
  url: https://bofip.impots.gouv.fr/bofip/1802-PGP.html/identifiant=BOI-BIC-DECLA-10-10-10-20260819
  type_source: primaire_publication_officielle
  date_publication: 2026-08-19
  date_mise_a_jour: 2026-08-19
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [micro_BIC, annees_reference, revalorisation, sortie]
  notes: >-
    Version BOI-BIC-DECLA-10-10-10 du 19 août 2026.
    I-A § 1 et I-B-1 § 30 à 45 : années examinées, seuils de l'année étudiée,
    dépassement et renvoi aux entreprises nouvelles. Documentation administrative.

- source_id: SRC_FR_MICRO_BOFIP_CREATION_2026
  organisme: Direction générale des Finances publiques / BOFiP-Impôts
  titre: "BIC - Régimes d’imposition et obligations déclaratives - Détermination des chiffres d’affaires annuels"
  url: https://bofip.impots.gouv.fr/bofip/1799-PGP.html/identifiant=BOI-BIC-DECLA-10-10-20-20260819
  type_source: primaire_publication_officielle
  date_publication: 2026-08-19
  date_mise_a_jour: 2026-08-19
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [micro_BIC, creation, prorata, vigilance_base, vigilance_cumul]
  notes: >-
    Version BOI-BIC-DECLA-10-10-20 du 19 août 2026.
    II-A § 30 et 35 : prorata et succession des années après création.
    I § 10 et II-B-2 § 100 et 110 : limites d'une assimilation des encaissements
    au CA ou d'une généralisation des cumuls BIC/BNC. Ces derniers points
    restent à instruire pour les usages exclus de cette V1.
```

## 4. Règles vérifiées

Les fiches suivantes sont des paraphrases structurées des sources, sauf les déductions explicitement indiquées. Les unités textuelles non applicables sont représentées par `null`. Les bornes de seuil sont inclusives : atteindre un plafond n’est pas le dépasser.

### Plafond des ventes

```yaml
rule_id: FR_MICRO_PLAFOND_VENTES_2026_2028
juridiction: FR
categorie: plafond_micro_BIC_ventes
intitule: Plafond annuel des ventes
type: numerique
valeur: 203100
unite: EUR CAHT
champ_application:
  activite: Ventes de marchandises, objets, fournitures et denrées à emporter ou à consommer sur place
  regime: micro_BIC
  conditions: Activité éligible de la catégorie ventes ; examen avec la règle des années de référence
  exclusions: Hébergement et locations spécifiques non traités dans cette V1
date_debut: 2026-01-01
date_fin: 2028-12-31
statut: verified
source_ids: [SRC_FR_MICRO_BOFIP_2026, SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_ECONOMIE_2026, SRC_FR_MICRO_CGI_50_0_20260701]
date_verification: 2026-09-09
notes: >-
  Période explicitement annoncée par le barème I-A § 1 pour 2026 à 2028.
  Ce plafond ne déclenche pas une sortie immédiate dès un premier dépassement.
  Aucun élargissement à une activité commerciale non qualifiée.
```

### Plafond des prestations de services et activités libérales

```yaml
rule_id: FR_MICRO_PLAFOND_SERVICES_BNC_2026_2028
juridiction: FR
categorie: plafond_micro_BIC_services_micro_BNC
intitule: Plafond annuel des services BIC et activités libérales BNC
type: numerique
valeur: 83600
unite: EUR HT
champ_application:
  activite: Prestations de services BIC et activités libérales BNC éligibles
  regime: micro_BIC ou micro_BNC selon qualification
  base: Chiffre d'affaires HT pour les services BIC ; recettes HT pour les BNC
  exclusions: Locations spécifiques, hébergement et base de calcul non qualifiée
date_debut: 2026-01-01
date_fin: 2028-12-31
statut: verified
source_ids: [SRC_FR_MICRO_BOFIP_2026, SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_ECONOMIE_2026, SRC_FR_MICRO_CGI_50_0_20260701, SRC_FR_MICRO_CGI_102_TER_20260701]
date_verification: 2026-09-09
notes: >-
  Barème I-C § 20 et III § 50 : période 2026 à 2028.
  Le libellé 83600 EUR CAHT s'applique aux services BIC ; conserver le terme
  recettes HT pour les BNC. Aucun seuil TVA n'est défini par cette valeur.
```

### Activité mixte : conditions cumulatives

```yaml
rule_id: FR_MICRO_MIXTE_VENTES_SERVICES_2026_2028
juridiction: FR
categorie: activite_mixte
intitule: Double plafond pour une activité mixte ordinaire de ventes et services
type: textuelle
valeur: "CAHT global <= 203100 EUR ET part services <= 83600 EUR CAHT"
unite: EUR CAHT pour les deux composantes
champ_application:
  activite: Ventes et prestations de services relevant du double plafond micro-BIC
  conditions: Qualification des composantes établie ; respecter ensemble plafond global et plafond de services
  exclusions: Locations spécifiques et articulations autonomes BIC/BNC non instruites
date_debut: 2026-01-01
date_fin: 2028-12-31
statut: verified
source_ids: [SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_ECONOMIE_2026, SRC_FR_MICRO_BOFIP_2026, SRC_FR_MICRO_CGI_50_0_20260701]
date_verification: 2026-09-09
notes: >-
  Les services sont compris dans le total : ne pas additionner les deux plafonds
  pour créer un plafond supplémentaire. Articuler ces conditions avec les années
  de référence. Les cumuls d'activités commerciales et non commerciales ne sont
  pas automatiquement assimilés à ce cas ; voir section 6.
```

### Années de référence N-1 / N-2

```yaml
rule_id: FR_MICRO_ANNEES_REFERENCE_2026
juridiction: FR
categorie: maintien_regime
intitule: Appréciation des dépassements sur les deux années de référence
type: textuelle
valeur: >-
  Pour l'année étudiée N, le régime reste accessible au regard du plafond
  si celui-ci est respecté en N-1 ou en N-2. Un dépassement sur une seule
  de ces années ne suffit pas à exclure le régime ; deux dépassements
  consécutifs en N-1 et N-2 entraînent la sortie en N.
unite: null
champ_application:
  regime: micro_BIC ou micro_BNC éligible, sans option contraire
  conditions: Années civiles de référence et base HT établies ; création et activité mixte traitées selon leurs fiches
  periode_etudiee: Année d'imposition 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_ECONOMIE_2026, SRC_FR_MICRO_BOFIP_REFERENCE_2026, SRC_FR_MICRO_CGI_50_0_20260701, SRC_FR_MICRO_CGI_102_TER_20260701]
date_verification: 2026-09-09
notes: >-
  N désigne l'année dont on détermine le régime, pas l'année de déclaration.
  Pour N = 2026, examiner 2025 et 2024 avec les plafonds applicables à 2026,
  comme l'indiquent Service Public et le BOFiP. Ne pas réutiliser mécaniquement
  les seuils historiques de ces années. Pour l'activité mixte, vérifier le
  plafond global et celui de la catégorie concernée, sans ignorer un dépassement.
```

### Sortie du régime

```yaml
rule_id: FR_MICRO_SORTIE_DEPASSEMENT_2026
juridiction: FR
categorie: sortie_regime
intitule: Date de sortie après deux années consécutives de dépassement
type: textuelle
valeur: Sortie au 1er janvier de l'année suivant la deuxième année consécutive de dépassement
unite: null
champ_application:
  regime: micro_BIC ou micro_BNC dans le périmètre V1
  conditions: Deux dépassements établis selon les seuils applicables à l'année de sortie étudiée
  periode_etudiee: Détermination du régime en 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_ECONOMIE_2026, SRC_FR_MICRO_BOFIP_REFERENCE_2026]
date_verification: 2026-09-09
notes: >-
  Exemple conceptuel : dépassement en N + dépassement en N+1
  implique sortie au 1er janvier N+2, sous réserve du contrôle des seuils
  de cette année cible. Une alerte prospective reste conditionnelle aux
  données et règles futures ; aucun montant hypothétique n'est nécessaire.
```

### Année de création

```yaml
rule_id: FR_MICRO_CREATION_PLEIN_DROIT_2026
juridiction: FR
categorie: creation
intitule: Application de plein droit l'année de création
type: textuelle
valeur: Le régime micro s'applique de plein droit l'année de création, en l'absence d'option contraire
unite: null
champ_application:
  activite: Création réelle d'une activité éligible micro-BIC ou micro-BNC
  conditions: Absence d'option contraire ; pas d'assimilation d'une reprise ou d'une activité additionnelle à une première création
  periode_etudiee: Création en 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_ECONOMIE_2026, SRC_FR_MICRO_BOFIP_CREATION_2026]
date_verification: 2026-09-09
notes: >-
  Ne pas déduire du dépassement d'un plafond proratisé une exclusion immédiate
  pendant l'année de création. Les autres conditions d'éligibilité restent requises.
```

### Prorata en cas de création en cours d’année

```yaml
rule_id: FR_MICRO_CREATION_PRORATA_2026
juridiction: FR
categorie: creation_prorata
intitule: Ajustement du plafond pour apprécier ultérieurement l'année de création
type: textuelle
valeur: "seuil_prorata = seuil_annuel × nombre_de_jours_exploitation / 365"
unite: EUR HT pour le résultat ; jours pour le temps d'exploitation
champ_application:
  activite: Nouvelle activité éligible commencée en cours d'année civile 2026
  conditions: Prorata appliqué à l'année de création lorsqu'elle sert de référence pour un examen ultérieur
  exclusions: Activités saisonnières, reprises, pluralité d'entreprises et calendriers particuliers non instruits
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_ECONOMIE_2026, SRC_FR_MICRO_BOFIP_CREATION_2026, SRC_FR_MICRO_CGI_50_0_20260701, SRC_FR_MICRO_CGI_102_TER_20260701]
date_verification: 2026-09-09
notes: >-
  Formule d'appréciation du plafond, pas de calcul de cotisations ou de TVA.
  Le BOFiP décrit aussi l'annualisation du CA ; ne pas cumuler les deux
  ajustements. Le seuil annuel dépend de l'année dont le régime est examiné :
  vérifier les revalorisations avant une appréciation ultérieure.
  Le dénominateur 365 est celui documenté pour ce contexte ; ne pas étendre
  la formule sans contrôle à d'autres calendriers. Un résultat chiffré serait
  une donnée calculée, avec formule, jours retenus et règles sources versionnées,
  jamais un nouveau plafond officiel publié. Aucun arrondi n'est inventé ici.
```

### Deuxième année d’activité

```yaml
rule_id: FR_MICRO_DEUXIEME_ANNEE_2026
juridiction: FR
categorie: creation_annees_reference
intitule: Maintien après création et repérage des années examinées
type: textuelle
valeur: >-
  Pour une création en C, le régime s'applique aussi en C+1 dans le cadre
  décrit par Service Public, sauf option contraire. Pour étudier C+2,
  les années de référence sont C+1 et C, selon la règle générale N-1 / N-2.
unite: null
champ_application:
  activite: Véritable création éligible sans activité antérieure dans les années de référence
  conditions: Distinguer C, année de création, et N, année étudiée ; pas de donnée manquante assimilée à une absence d'activité
  periode_etudiee: Application du socle en 2026 ; projection à recontrôler
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_BOFIP_CREATION_2026, SRC_FR_MICRO_BOFIP_REFERENCE_2026, SRC_FR_MICRO_CGI_102_TER_20260701]
date_verification: 2026-09-09
notes: >-
  C+2 renvoie à C+1 et C par substitution dans la règle générale ; le BOFiP
  II-A § 35 le confirme expressément en BIC. Le décalage rédactionnel de
  Service Public est conservé en section 7. Le prorata concerne C lorsqu'elle
  sert de référence ; ne pas transformer cette règle en exclusion immédiate en C+1.
```

### Régime micro et TVA

```yaml
rule_id: FR_MICRO_DISTINCTION_TVA_2026
juridiction: FR
categorie: articulation_micro_TVA
intitule: Indépendance du régime micro et de la franchise en base de TVA
type: textuelle
valeur: "régime_micro ≠ franchise_en_base_de_TVA ; un entrepreneur peut rester au régime micro tout en étant assujetti à la TVA"
unite: null
champ_application:
  regime: Entrepreneur relevant du régime micro
  conditions: Examiner séparément sa situation en matière de TVA
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_MICRO_IMPOTS]
date_verification: 2026-09-09
notes: >-
  Fondement limité au passage consacré à la TVA. Aucun seuil de franchise,
  fait générateur ou calcul de TVA n'est validé ici. Renvoi à ./tva.md,
  dont le contenu doit lui-même être vérifié avant utilisation.
```

## 5. Historique

L’état antérieur de ce fichier était une fiche préparatoire sans règle ni valeur validée. Aucune règle préexistante n’a donc été supprimée. L’historique ci-dessous est ajouté à partir du barème consulté, sans simuler une vérification effectuée à l’époque.

```yaml
rule_id: FR_MICRO_PLAFOND_BNC_2023_2025
juridiction: FR
categorie: plafond_micro_BNC
intitule: Ancien plafond annuel des activités libérales BNC
type: numerique
valeur: 77700
unite: EUR recettes HT
champ_application:
  regime: micro_BNC
  activite: Activités libérales éligibles
  conditions: Usage historique uniquement ; années du régime étudié 2023 à 2025
date_debut: 2023-01-01
date_fin: 2025-12-31
statut: superseded
source_ids: [SRC_FR_MICRO_BOFIP_2026]
date_verification: 2026-09-09
remplace_par: FR_MICRO_PLAFOND_SERVICES_BNC_2026_2028
notes: >-
  Période et montant explicitement confirmés au III § 50 du barème.
  Vérification historique effectuée le 2026-09-09 ; lien de remplacement
  limité à la composante BNC de la nouvelle règle. Ne pas employer cet ancien
  plafond pour déterminer le régime 2026 à partir de recettes 2024 ou 2025.
```

Aucune entrée historique ventes ou services BIC sur l’intégralité de 2023–2025 n’est créée : le barème consulté présente leur ancienne valeur pour 2025, sans établir dans ces tableaux toute la période demandée. Ne pas étendre la preuve BNC aux BIC.

À chaque révision, conserver la valeur précédente, ses sources et la trace de vérification ; créer une nouvelle version si la règle change réellement, avec ses dates et le lien de remplacement. Ne pas effacer les observations ci-dessous.

## 6. Règles exclues / à vérifier

Hors périmètre V1 : meublés de tourisme non classés, meublés classés, chambres d’hôtes, micro-BA, régimes agricoles et autres cas spécifiques de location meublée. Leurs plafonds ne sont pas reproduits. Les activités saisonnières, l’hébergement, les reprises, les changements de catégorie et les pluralités d’entreprises demandent un traitement séparé.

Le cumul d’activités BIC et BNC ne doit pas être traité par simple addition ou application universelle du double plafond. La qualification de ce cumul reste `needs_review` pour un dossier qui le requiert ; les distinctions signalées au II-B-2 du commentaire BOFiP sur le CA doivent alors être instruites.

```yaml
rule_id: FR_MICRO_BASE_CA_RECETTES_A_VERIFIER_2026
juridiction: FR
categorie: qualification_base
intitule: Rapprochement du CA, des recettes et des encaissements
type: textuelle
valeur: null
unite: null
champ_application:
  activite: Toute conversion des données de gestion en base de comparaison micro-BIC ou micro-BNC
  conditions: Qualification de la catégorie et méthode de rattachement des opérations nécessaires
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: needs_review
source_ids: [SRC_FR_MICRO_SERVICE_PUBLIC_2026, SRC_FR_MICRO_BOFIP_2026, SRC_FR_MICRO_BOFIP_CREATION_2026]
date_verification: 2026-09-09
notes: >-
  Valeur absente intentionnellement : aucune équivalence universelle n'est validée.
  Conserver CAHT pour les BIC et recettes HT pour les BNC. Le I § 10 du commentaire
  BOFiP distingue des méthodes avec conditions ; les quatre sources initiales
  ne suffisent pas à définir ici une règle commune de rapprochement.
  Bloquer l'application à des encaissements bruts dont la base n'est pas qualifiée.
```

Une incertitude sur la base ou le champ bloque l’utilisation dans le dossier concerné, même si la valeur numérique du plafond est `verified`. Ne jamais compléter une recette manquante par zéro.

## 7. Contradictions ou points de vigilance

### Anciennes valeurs sur impots.gouv.fr

Au 2026-09-09, la page `SRC_FR_MICRO_IMPOTS` affiche encore des plafonds antérieurs dans sa rubrique sur les conditions d’accès. Ce constat illustre une source officielle potentiellement obsolète pour une année donnée. La page reste enregistrée ; elle n’est utilisée ici que pour la distinction micro/TVA.

Pour les plafonds 2026, la divergence est résolue par leur champ temporel explicite dans `SRC_FR_MICRO_BOFIP_2026`, confirmé par Service Public et economie.gouv.fr. Ce choix repose sur l’applicabilité documentée, pas sur la seule fraîcheur de publication. Les règles de plafond restent `verified` dans leur périmètre.

### Décalage d’années dans Service Public

Dans le développement sur la création, Service Public annonce un examen pour N+2, puis désigne N et N-1 comme références. Cette formulation ne concorde pas avec sa règle générale. Elle n’est pas reproduite comme règle applicable.

Résolution : conserver la notation C pour la création et N pour l’année étudiée. Pour N = C+2, les références N-1 / N-2 sont C+1 / C. Le II-A § 35 de `SRC_FR_MICRO_BOFIP_CREATION_2026` confirme cette succession en BIC ; les textes normatifs retiennent les deux années précédant l’année étudiée. La règle de deuxième année est `verified` dans ce cadre, sans reprendre le décalage rédactionnel.

### Hébergement et références de versions

Les formulations larges relatives à l’hébergement divergent entre les pages explicatives. Ces activités sont exclues de la V1 ; aucun de leurs plafonds n’est validé ici. Une demande sur ce champ exige une vérification séparée.

Un ancien identifiant lié depuis Service Public pour l’article 102 ter a conduit à contrôler la version applicable via Légifrance. Seule la version actuelle effectivement récupérée est enregistrée comme complément normatif. Ne pas confondre une redirection vers un texte actuel avec la validité de l’ancienne version, ni la date de version du code avec l’année d’application du barème.

### Journal de vérification initial

| Date | Sources et règles examinées | Résultat et contradiction éventuelle | Statut retenu |
| --- | --- | --- | --- |
| 2026-09-09 | Service Public, economie.gouv.fr, BOFiP barème ; règles de plafonds et activité mixte | Valeurs et période recoupées ; anciennes valeurs impots.gouv.fr écartées pour 2026 ; hébergement exclu | `verified` pour le champ V1 |
| 2026-09-09 | CGI 50-0 et 102 ter, BOFiP référence, Service Public ; années de référence et sortie | Condition sur les deux années précédentes et usage des seuils de l'année étudiée confirmés | `verified` |
| 2026-09-09 | Service Public, economie.gouv.fr, BOFiP création ; création, prorata et deuxième année | Prorata et succession des années recoupés ; décalage rédactionnel Service Public résolu dans le cadre décrit | `verified` |
| 2026-09-09 | impots.gouv.fr ; distinction micro/TVA | Principe confirmé dans le passage dédié ; ancienne présentation des plafonds non utilisée | `verified` |
| 2026-09-09 | BOFiP barème III § 50 ; ancien plafond BNC | Période 2023–2025 confirmée ; preuve non étendue aux BIC | `superseded` |
| 2026-09-09 | Service Public, BOFiP barème et création ; base CA/recettes/encaissements | Pas de règle universelle suffisamment instruite pour le rapprochement ; cumul BIC/BNC également réservé | `needs_review` pour ces usages |

Toute nouvelle contradiction non résolue impose le passage de la règle concernée à `needs_review` et bloque une conclusion automatique. Ajouter le nouvel événement au journal, sans écraser les vérifications et observations précédentes.

## 8. Utilisation par les sous-skills

Les sous-skills peuvent utiliser ce socle pour examiner l’éligibilité au regard des plafonds, identifier un risque de sortie et construire une alerte de pilotage. Ils doivent d’abord :

1. Identifier l’année N étudiée, l’activité, sa catégorie et les options ou exclusions pertinentes.
2. Sélectionner une règle `verified` dont la période et le champ couvrent la situation ; réserver `superseded` à l’historique documenté.
3. Obtenir les données HT qualifiées des années de référence N-1 / N-2, leur ventilation et, si nécessaire, les éléments de création.
4. Comparer avec les seuils de l’année étudiée, en respectant le double plafond lorsque applicable et le seul ajustement de prorata pertinent.
5. Vérifier l’absence de contradiction ouverte et citer les identifiants de règles et sources, ainsi que la date du contrôle.

Une pièce manquante, une base `needs_review` ou une activité hors périmètre empêche de conclure automatiquement. Une projection de CA reste une prévision : elle permet une alerte conditionnelle, pas une sortie du régime présentée comme acquise. Un résultat calculé conserve ses dépendances et ses hypothèses.

Ces règles ne servent directement ni à calculer les cotisations ou la TVA, ni à déterminer l’impôt, ni à certifier la conformité fiscale complète. Consulter séparément [TVA](./tva.md) et [cotisations sociales](./cotisations-sociales.md). Ces renvois ne présument pas que les fiches destinataires sont déjà vérifiées.

## 9. Statut V1

Les règles du socle micro 2026 sont vérifiées dans le périmètre explicité et les sources officielles sont enregistrées. Les plafonds sont documentés pour 2026–2028 ; l’historique ajouté se limite au BNC confirmé. La TVA est renvoyée à `tva.md` et les cotisations à `cotisations-sociales.md`. Les cas spécifiques exclus, les limites de qualification des bases et les points de vigilance sont explicites.

Aucun moteur automatique n’est encore implémenté. La validation de ces fiches ne vaut ni calcul fiscal complet, ni certification de conformité, ni résolution d’une situation juridique ambiguë.
