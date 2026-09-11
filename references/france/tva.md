# Franchise en base de TVA — Référentiel France V1 (2026)

## 1. Statut

Vérification effectuée le **2026-09-09**, selon [sources.md](./sources.md) et les conventions de [micro-entreprise.md](./micro-entreprise.md). Chaque statut concerne une règle, une période et un champ précis. Aucun fait propre à Kirexo n’est supposé.

Deux écarts avec les pages explicatives doivent être conservés : le BOFiP prévoit un prorata dès l’année de création ; la recodification annoncée pour le **2026-09-01** a été reportée au **2027-01-01**. Les preuves et les conséquences figurent en sections 5, 7 et 10.

Les quatre plafonds sont documentés depuis le `2025-01-01`, date expressément indiquée par les sources impots.gouv.fr. Les autres règles de fonctionnement sont vérifiées pour 2026 : leur `date_debut` borne cette couverture documentaire, sans dater leur création juridique. `date_fin: null` signifie uniquement qu’aucune fin de la règle n’est connue lors de la vérification, jamais une validité illimitée. Une fin de version d’article n’est pas nécessairement une fin du montant qu’il porte.

## 2. Périmètre

Franchise en base de droit commun, pour une entreprise établie en France métropolitaine réalisant des opérations nationales ordinaires éligibles : plafonds de base et majorés, perte de franchise, date du dépassement, activité mixte, création, deuxième année, prorata, base HT et articulation avec le régime fiscal micro.

La qualification TVA des opérations doit être établie. Dans cette fiche, la catégorie services soumise au plafond spécifique exclut les ventes à consommer sur place et les prestations d’hébergement. Le plafond global porte sur l’ensemble des opérations retenues, y compris en activité mixte ; il n’est pas un plafond additionnel réservé aux seules ventes.

Les conditions autres que les plafonds, notamment une option pour la TVA ou une exclusion du régime, doivent être examinées avant de conclure. Les cas spécifiques et opérations exclus de cette V1 sont listés en section 9. La fiche prépare une analyse de pilotage, pas une déclaration ni une certification fiscale.

## 3. Sources

Les fiches ci-dessous permettent de retrouver les passages effectivement consultés. Un enregistrement ne valide pas l’ensemble de la page. `null` dans une date éditoriale signifie qu’elle n’a pas été établie ; la consultation ne s’y substitue pas.

### Sources demandées

```yaml
- source_id: SRC_FR_TVA_BOFIP_CHAMP_20260701
  organisme: Direction générale des Finances publiques / BOFiP-Impôts
  titre: "TVA - Régimes d’imposition et obligations déclaratives et comptables - Franchise de taxe - Franchise en base de droit commun - Champ d’application et limites à considérer"
  url: https://bofip.impots.gouv.fr/bofip/849-PGP.html/identifiant=BOI-TVA-DECLA-40-10-10-20260701
  type_source: primaire_publication_officielle
  date_publication: 2026-07-01
  date_mise_a_jour: 2026-07-01
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [plafonds, depassement, base_HT, creation, prorata, deuxieme_annee, activite_mixte]
  notes: >-
    Version BOI-TVA-DECLA-40-10-10 du 1er juillet 2026, documentation administrative.
    II § 130 : année précédente, dépassement et base HT ; II-A § 140 à 160 :
    catégories et activité mixte ; II-B § 180, 220 et 230 : CA de référence ;
    II-B-5-a § 285 à 295 : création et prorata ; II-B-5-b § 300 : globalisation.
    Les renvois essentiels au CGI ont été suivis. Divergences conservées en section 10.

- source_id: SRC_FR_TVA_IMPOTS_MICRO_2026
  organisme: Direction générale des Finances publiques / impots.gouv.fr
  titre: "Je suis micro-entrepreneur ou à la tête d'une micro-entreprise. Ai-je des obligations déclaratives en matière de TVA ?"
  url: https://www.impots.gouv.fr/professionnel/questions/je-suis-micro-entrepreneur-ou-la-tete-dune-micro-entreprise-ai-je-des
  type_source: secondaire_officielle
  date_publication: 2016-09-16
  date_mise_a_jour: 2026-05-21
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [plafonds, date_debut_plafonds, perte_franchise, distinction_micro, signal_recodification]
  notes: >-
    Passage sur les différents cas de sortie : quatre plafonds, effets des
    dépassements et application depuis le 1er janvier 2025. Distinction micro/TVA.
    Note de recodification devenue obsolète sur la date et la référence proposées ;
    ne pas la reprendre comme état du droit au jour du contrôle.
    Facturation, déclarations et opérations intracommunautaires non extraites.

- source_id: SRC_FR_TVA_IMPOTS_REGIMES_2026
  organisme: Direction générale des Finances publiques / impots.gouv.fr
  titre: Les régimes d'imposition à la TVA
  url: https://www.impots.gouv.fr/professionnel/les-regimes-dimposition-la-tva
  type_source: secondaire_officielle
  date_publication: 2017-08-24
  date_mise_a_jour: 2026-05-21
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [plafonds, distinction_micro, divergence_creation]
  notes: >-
    Rubrique franchise en base, champ d'application : confirmation complémentaire
    des montants et de leur date d'application. Méthode de création divergente
    du BOFiP, non utilisée pour valider création et prorata. Les régimes réels
    et les autres développements de la page restent hors périmètre.
```

Service Public n’est pas ajouté : les recoupements utiles des seuils et de leurs effets sont disponibles dans les sources précédentes et le texte normatif.

### Compléments nécessaires : textes et contrôle des versions

Ces sources servent à trancher les divergences sur le prorata, les bornes de seuil et le calendrier de recodification. Les identifiants ont été récupérés puis contrôlés dans la session ; une version officielle non applicable est signalée comme telle.

```yaml
- source_id: SRC_FR_TVA_CGI_293_B
  organisme: Légifrance
  titre: Article 293 B du Code général des impôts
  url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000052488142
  type_source: primaire_texte_normatif
  date_publication: null
  date_mise_a_jour: null
  date_debut_version: 2025-03-01
  date_fin_version_exclusive: 2027-01-01
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [plafonds, activite_mixte, depassement, bornes]
  notes: >-
    Art. 293 B, CGI, version du 01/03/2025 au 01/01/2027 exclu,
    LEGIARTI000052488142, consulté le 09/09/2026. Applicable à cette date ;
    abrogation différée, pas abrogation déjà effective. Fonction : tableau du I
    et perte à la date du dépassement au II. La date de cette version ne remplace
    pas la date d'application des seuils confirmée par les pages impots.gouv.fr.

- source_id: SRC_FR_TVA_CGI_293_D
  organisme: Légifrance
  titre: Article 293 D du Code général des impôts
  url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000052488147
  type_source: primaire_texte_normatif
  date_publication: null
  date_mise_a_jour: null
  date_debut_version: 2025-03-01
  date_fin_version_exclusive: 2027-01-01
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [base_HT, creation, prorata]
  notes: >-
    Art. 293 D, CGI, version du 01/03/2025 au 01/01/2027 exclu,
    LEGIARTI000052488147, consulté le 09/09/2026. Applicable à cette date.
    Fonction : base hors TVA au I et ajustement des plafonds à la création au III.
    Les opérations particulières et les dispositions européennes ne sont pas
    détaillées dans la V1. Le texte étaye la méthode du BOFiP face à la source C.

- source_id: SRC_FR_TVA_ORDONNANCE_CALENDRIER_20260729
  organisme: Légifrance
  titre: Article 49 de l'ordonnance n° 2025-1247 du 17 décembre 2025 portant recodification de la taxe sur la valeur ajoutée et diverses modifications du code des impositions sur les biens et services
  url: https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000054587047
  type_source: primaire_texte_normatif
  date_publication: null
  date_mise_a_jour: 2026-07-29
  date_debut_version: 2026-07-29
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [report_recodification]
  notes: >-
    LEGIARTI000054587047, version en vigueur depuis le 29/07/2026,
    consultée et applicable au 09/09/2026. Fonction : calendrier d'entrée
    en vigueur, modifié par l'ordonnance n° 2026-671 du 27 juillet 2026, article 17.
    Report général au 1er janvier 2027, avec exceptions énumérées dans le texte.
    Le maintien des articles 293 B et 293 D jusqu'à cette date a été recoupé
    directement dans leurs métadonnées ; pas d'extension de la conclusion à tous
    les sujets TVA exclus de la fiche.

- source_id: SRC_FR_TVA_CIBS_REFERENCE_ECARTEE
  organisme: Légifrance
  titre: Article L223-3 du Code des impositions sur les biens et services — version initialement prévue
  url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053107172
  type_source: primaire_texte_normatif_non_applicable
  date_publication: null
  date_mise_a_jour: null
  date_consultation: 2026-09-09
  juridiction: FR
  sujets: [controle_reference_recodification]
  notes: >-
    Identifiant lié par la FAQ impots.gouv.fr. Le connecteur Légifrance retourne
    MODIFIE_MORT_NE et applicable_at_as_of_date=false au 09/09/2026.
    La version prévue pour le 01/09/2026 a été modifiée avant cette échéance.
    Cette source est conservée comme preuve du rejet d'une référence ancienne,
    jamais comme fondement d'une règle applicable ou comme correspondance actuelle.
```

## 4. Règles vérifiées

Les règles sont paraphrasées et limitées au périmètre V1. Pour les montants, `<=` signifie respect de la limite et `>` dépassement, conformément au tableau et au II de l’article 293 B. Une égalité n’est pas un dépassement. Les limites annuelles nominales ci-dessous doivent être articulées avec la création et le prorata de la section 5.

### Seuil de base — ventes / plafond global

```yaml
rule_id: FR_TVA_BASE_VENTES_2025
juridiction: FR
categorie: franchise_base_ventes
intitule: Plafond de base pour les ventes et le CA global
type: numerique
valeur: 85000
unite: EUR CAHT
champ_application:
  activite: Livraisons de biens et ventes ordinaires éligibles au plafond général ; global en activité mixte
  periode_reference: Année civile précédente pour déterminer la franchise de l'année étudiée
  conditions: Droit commun métropolitain ; autres conditions satisfaites ; création traitée séparément
date_debut: 2025-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_IMPOTS_MICRO_2026, SRC_FR_TVA_CGI_293_B]
date_verification: 2026-09-09
notes: >-
  CGI 293 B, I, ligne année précédente ; BOFiP II-A § 140.
  Date de début confirmée par la FAQ impots.gouv.fr. Ne pas appliquer aux
  professions ou territoires exclus. Le contrôle de services s'ajoute en activité mixte.
```

### Seuil majoré — ventes / plafond global

```yaml
rule_id: FR_TVA_MAJORE_VENTES_2025
juridiction: FR
categorie: franchise_majore_ventes
intitule: Plafond majoré des ventes et du CA global en cours d'année
type: numerique
valeur: 93500
unite: EUR CAHT
champ_application:
  activite: Livraisons de biens et ventes ordinaires éligibles ; global en activité mixte
  periode_reference: CA cumulé de l'année civile en cours
  conditions: Entreprise admise à la franchise ; appliquer le prorata si année de création incomplète
date_debut: 2025-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_CGI_293_B, SRC_FR_TVA_IMPOTS_MICRO_2026, SRC_FR_TVA_BOFIP_CHAMP_20260701]
date_verification: 2026-09-09
notes: >-
  CGI 293 B, I, ligne année en cours, et II. Un dépassement strict de la
  limite applicable fait perdre la franchise à la date du dépassement.
  Le montant nominal n'est pas toujours la limite ajustée à la création.
```

### Seuil de base — prestations de services

```yaml
rule_id: FR_TVA_BASE_SERVICES_2025
juridiction: FR
categorie: franchise_base_services
intitule: Plafond de base des prestations de services concernées
type: numerique
valeur: 37500
unite: EUR CAHT
champ_application:
  activite: Prestations de services de droit commun autres que ventes à consommer sur place et hébergement
  periode_reference: Année civile précédente pour déterminer la franchise de l'année étudiée
  conditions: Activité éligible dans le périmètre V1 ; ajustement de création si nécessaire
date_debut: 2025-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_IMPOTS_MICRO_2026, SRC_FR_TVA_CGI_293_B]
date_verification: 2026-09-09
notes: >-
  CGI 293 B, I ; BOFiP II-A § 140 et 150. Même contrôle sur la composante
  services concernée en activité mixte. Ne pas assimiler ce plafond à un plafond micro.
```

### Seuil majoré — prestations de services

```yaml
rule_id: FR_TVA_MAJORE_SERVICES_2025
juridiction: FR
categorie: franchise_majore_services
intitule: Plafond majoré des prestations de services concernées
type: numerique
valeur: 41250
unite: EUR CAHT
champ_application:
  activite: Prestations de services de droit commun autres que ventes à consommer sur place et hébergement
  periode_reference: CA cumulé de l'année civile en cours
  conditions: Entreprise admise à la franchise ; appliquer le prorata si année de création incomplète
date_debut: 2025-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_CGI_293_B, SRC_FR_TVA_IMPOTS_MICRO_2026, SRC_FR_TVA_BOFIP_CHAMP_20260701]
date_verification: 2026-09-09
notes: >-
  CGI 293 B, I et II ; dépassement strict, avec effet à la date du dépassement.
  Ne pas reporter la perte de franchise à un mois ultérieur.
```

### Dépassement du seul seuil de base

```yaml
rule_id: FR_TVA_DEPASSEMENT_BASE_2026
juridiction: FR
categorie: perte_franchise_annee_suivante
intitule: Maintien en N puis perte en N+1 après dépassement du seuil de base
type: textuelle
valeur: >-
  Si CA_N > seuil_base ET CA_N <= seuil_majore, la franchise peut être
  conservée jusqu'au 31 décembre N ; elle est perdue au 1er janvier N+1.
unite: null
champ_application:
  activite: Opérations de droit commun de la catégorie concernée
  conditions: Franchise acquise pour N, autres conditions satisfaites, aucun dépassement majoré pendant N
  adaptation: En création, comparer aux limites ajustées ; en mixte, contrôler les deux composantes
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_IMPOTS_MICRO_2026, SRC_FR_TVA_CGI_293_B, SRC_FR_TVA_BOFIP_CHAMP_20260701]
date_verification: 2026-09-09
notes: >-
  FAQ, cas de sortie pour dépassement ; BOFiP II § 130.
  CA_N désigne ici la donnée de référence de l'année complète. Une prévision
  en cours d'année ne garantit pas le maintien jusqu'à sa fin. Le mécanisme
  des deux années consécutives du régime fiscal micro ne s'applique pas ici.
```

### Dépassement du seuil majoré et date d’effet

```yaml
rule_id: FR_TVA_DEPASSEMENT_MAJORE_2026
juridiction: FR
categorie: perte_franchise_en_cours_annee
intitule: Perte de franchise dès la date du dépassement majoré
type: textuelle
valeur: "CA_N > seuil_majore_applicable => perte de franchise à la date du dépassement"
unite: null
champ_application:
  activite: Entreprise en franchise réalisant les opérations ordinaires couvertes
  conditions: Dépassement constaté sur le CA cumulé qualifié ; limite ajustée si création
  adaptation: En activité mixte, dépassement de l'une des deux limites majorées
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_CGI_293_B, SRC_FR_TVA_IMPOTS_MICRO_2026]
date_verification: 2026-09-09
notes: >-
  CGI 293 B, II : effet pour les opérations à compter de la date de dépassement.
  Le futur moteur doit suivre chronologiquement le CA cumulé et les opérations
  retenues. Un total annuel peut prouver le dépassement, mais ne suffit pas à
  inventer sa date. Cette fiche ne calcule pas la taxe attachée aux opérations.
```

### Base hors TVA

```yaml
rule_id: FR_TVA_BASE_HORS_TAXE_2026
juridiction: FR
categorie: base_comparaison
intitule: Base hors TVA pour apprécier les plafonds de franchise
type: textuelle
valeur: >-
  Comparer le CA de référence hors TVA. Si la TVA était collectée, l'en retirer ;
  si l'entreprise bénéficiait de la franchise, retenir le total du CA correspondant,
  sans retrancher une TVA fictive.
unite: EUR CAHT
champ_application:
  activite: Opérations nationales ordinaires retenues pour la franchise
  conditions: Périmètre des opérations et année de rattachement préalablement qualifiés
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_CGI_293_D, SRC_FR_TVA_BOFIP_CHAMP_20260701]
date_verification: 2026-09-09
notes: >-
  CGI 293 D, I ; BOFiP II § 130 et II-B § 180. Le total correspondant n'est
  pas l'ensemble des entrées bancaires. Aucune conversion TTC/HT par un taux
  supposé et aucune équivalence générale entre CA, recettes et encaissements.
  Une base non qualifiée rend le résultat du dossier indisponible.
```

### Régime fiscal micro et franchise TVA

```yaml
rule_id: FR_TVA_DISTINCTION_MICRO_2026
juridiction: FR
categorie: articulation_regimes
intitule: Séparation du régime fiscal micro et de la franchise TVA
type: textuelle
valeur: "regime_micro ≠ franchise_TVA ; la perte de franchise peut coexister avec le maintien du régime fiscal micro"
unite: null
champ_application:
  activite: Entrepreneur relevant du régime fiscal micro et d'opérations dans le champ TVA
  conditions: Examiner séparément les conditions de chacun des deux régimes
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_IMPOTS_MICRO_2026, SRC_FR_TVA_IMPOTS_REGIMES_2026]
date_verification: 2026-09-09
notes: >-
  Renvoi à ./micro-entreprise.md. Les plafonds micro 203100 / 83600
  ne sont jamais des seuils TVA. La sortie TVA ne démontre pas la sortie micro,
  et le maintien micro ne démontre pas le bénéfice de la franchise TVA.
```

## 5. Création et prorata

C désigne l’année civile de création. Les règles de cette section suivent le BOFiP du 1er juillet 2026, recoupé avec le III de l’article 293 D. La méthode contraire de la page générale impots.gouv.fr est conservée en section 10, sans être incorporée au calcul.

### Première année

```yaml
rule_id: FR_TVA_CREATION_PREMIERE_ANNEE_2026
juridiction: FR
categorie: creation_franchise
intitule: Contrôle des plafonds majorés pendant l'année de création
type: textuelle
valeur: >-
  En C, la franchise est accessible sous les autres conditions requises tant
  que le CA de référence ne dépasse pas le plafond majoré applicable,
  ajusté à la durée d'activité si la création intervient en cours d'année.
unite: EUR CAHT pour le contrôle
champ_application:
  activite: Entreprise nouvelle de droit commun dans le périmètre V1
  conditions: Pas d'option contraire ; jours d'activité connus ; double limite si mixte
  exclusions: Activités saisonnières ou intermittentes, reprises et autres cas non instruits
  periode_etudiee: Création en 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_CGI_293_D, SRC_FR_TVA_CGI_293_B]
date_verification: 2026-09-09
notes: >-
  BOFiP II-B-5-a § 290 ; ajustement des plafonds confirmé par CGI 293 D, III.
  Le dépassement d'une limite ajustée entraîne la perte à sa date.
  Ne pas appliquer automatiquement les montants majorés non ajustés en C.
  Les termes de dépassement du CGI gouvernent les cas d'égalité ; voir section 10.
```

### Accès à la franchise en deuxième année

```yaml
rule_id: FR_TVA_CREATION_ACCES_DEUXIEME_ANNEE_2026
juridiction: FR
categorie: creation_reference_annee_precedente
intitule: Comparaison du CA de création aux plafonds de base ajustés
type: textuelle
valeur: >-
  Pour déterminer l'accès à la franchise en C+1, comparer le CA de C
  aux plafonds de base 85000 / 37500, selon la catégorie, ajustés à la durée
  d'activité de C. Un dépassement exclut la franchise au 1er janvier C+1.
unite: EUR CAHT
champ_application:
  activite: Entreprise créée en cours d'année, relevant du droit commun V1
  conditions: Autres conditions d'éligibilité satisfaites ; base et durée de C documentées
  exclusions: Activités saisonnières ou intermittentes et autres cas non instruits
  periode_etudiee: Détermination de la franchise en 2026 ; projection ultérieure à recontrôler
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_CGI_293_B, SRC_FR_TVA_CGI_293_D]
date_verification: 2026-09-09
notes: >-
  BOFiP II-B-5-a § 295. Ce contrôle porte sur les plafonds de base,
  pas sur les plafonds majorés. Il n'accorde pas à lui seul un maintien
  pour toute la deuxième année ; suivre aussi le CA de C+1.
```

### Contrôle pendant la deuxième année

```yaml
rule_id: FR_TVA_DEUXIEME_ANNEE_MAJORES_2026
juridiction: FR
categorie: deuxieme_annee_suivi
intitule: Seuils majorés non ajustés pendant la deuxième année
type: textuelle
valeur: >-
  Si les conditions d'accès à C+1 sont remplies, la franchise y est maintenue
  tant que le CA cumulé ne dépasse pas les plafonds majorés 93500 / 41250
  correspondant aux opérations ; ces plafonds ne sont plus proratisés.
unite: EUR CAHT
champ_application:
  activite: Deuxième année civile d'une entreprise nouvelle éligible
  conditions: Contrôle préalable du CA de C sur les limites de base ajustées ; autres conditions satisfaites
  adaptation: Double limite majorée en activité mixte
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_CGI_293_B]
date_verification: 2026-09-09
notes: >-
  BOFiP II-B-5-a § 295 confirme expressément que l'ajustement n'est plus requis
  pour ce contrôle. Une deuxième année est une année civile, pas une période
  glissante calculée à partir de l'anniversaire de création.
```

### Méthode du prorata

```yaml
rule_id: FR_TVA_PRORATA_CREATION_2026
juridiction: FR
categorie: methode_prorata
intitule: Ajustement du plafond à la durée d'activité de l'année de création
type: textuelle
valeur: "plafond_ajuste = plafond_annuel / 365 × jours_activite_C"
unite: EUR CAHT ; durée exprimée en jours
champ_application:
  activite: Création en cours d'année civile ordinaire dans le périmètre V1
  conditions: Date de début et nombre de jours d'activité de C jusqu'à la fin de C établis
  plafond_cible: Majoré pour le contrôle en C ; base pour déterminer la franchise en C+1
  exclusions: Activités saisonnières ou intermittentes, calendriers particuliers non instruits
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_CGI_293_D]
date_verification: 2026-09-09
notes: >-
  Forme de calcul donnée au BOFiP II-B-5-a § 290 et illustrée au § 295.
  Ne pas ajuster simultanément le CA et le plafond. Ne pas importer la règle
  du régime micro. Aucun arrondi générique n'est établi par les seuls exemples.
  Une application numérique reste un calcul dépendant de cette règle et du
  plafond source, pas une nouvelle valeur officielle. Conserver la formule,
  l'année C, les jours, le plafond visé, ses identifiants et la source précise.
```

## 6. Activité mixte

La TVA a ses propres catégories et limites. La composante services est comprise dans le CA global : ne pas additionner les plafonds pour obtenir une enveloppe supplémentaire, ni créer un compteur indépendant de l’ensemble des opérations de l’entreprise.

### Année précédente : deux plafonds de base

```yaml
rule_id: FR_TVA_MIXTE_BASE_2026
juridiction: FR
categorie: activite_mixte_base
intitule: Double contrôle du CA de l'année précédente
type: textuelle
valeur: "CA_global_N_moins_1 <= 85000 ET CA_services_concernes_N_moins_1 <= 37500"
unite: EUR CAHT
champ_application:
  activite: Entreprise réalisant les deux catégories d'opérations de droit commun
  conditions: Ventilation qualifiée ; contrôles cumulatifs ; autres conditions satisfaites
  adaptation: Plafonds de base ajustés si l'année de référence est une création en cours d'année
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_CGI_293_B]
date_verification: 2026-09-09
notes: >-
  BOFiP II-A § 160 et CGI 293 B, I, ligne année précédente.
  Services concernés : autres que ventes à consommer sur place et hébergement.
  Les exclusions V1 subsistent. Les deux bornes sont inclusives selon le CGI.
```

### Année en cours : deux plafonds majorés

```yaml
rule_id: FR_TVA_MIXTE_MAJORES_2026
juridiction: FR
categorie: activite_mixte_majores
intitule: Double contrôle du CA cumulé en cours d'année
type: textuelle
valeur: "CA_global_N <= 93500 ET CA_services_concernes_N <= 41250"
unite: EUR CAHT
champ_application:
  activite: Entreprise en franchise réalisant les deux catégories ordinaires d'opérations
  conditions: Deux limites cumulatives, ventilation qualifiée et suivi chronologique
  adaptation: Plafonds majorés ajustés en création incomplète ; non ajustés en deuxième année
  periode_etudiee: 2026
date_debut: 2026-01-01
date_fin: null
statut: verified
source_ids: [SRC_FR_TVA_BOFIP_CHAMP_20260701, SRC_FR_TVA_CGI_293_B]
date_verification: 2026-09-09
notes: >-
  Vérification du renvoi explicite du BOFiP II § 130 à la ligne année en cours
  du tableau CGI 293 B, I : CA national total 93500 et services concernés 41250.
  Le II du même article prévoit la perte dès le dépassement de l'un des plafonds.
  Le § 160 du BOFiP seul traite l'année précédente ; il ne suffit pas à prouver
  cette seconde formule. Le texte normatif cité par le BOFiP a donc été lu.
  La règle ne provient pas de l'activité mixte du régime fiscal micro.
```

## 7. Recodification

### Calendrier vérifié : annonce initiale et report

La FAQ impots.gouv.fr mise à jour le 21 mai 2026 conserve l’annonce du `2026-09-01`. L’article 49 actualisé de l’ordonnance de recodification fixe désormais l’échéance générale au `2027-01-01`. Les versions des articles 293 B et 293 D contrôlées sur Légifrance restent applicables au 9 septembre 2026, avec une fin de version prévue au 1er janvier 2027 exclu.

Ainsi, cette V1 ne présente pas la recodification comme déjà entrée en vigueur en septembre 2026. Cette correction concerne le calendrier et les références utiles à la franchise ; elle ne prétend pas couvrir les exceptions de calendrier propres aux autres sujets TVA.

```yaml
rule_id: FR_TVA_RECODIFICATION_PREVUE_2027
juridiction: FR
categorie: recodification_future
intitule: Recodification TVA prévue au 1er janvier 2027 après report
type: textuelle
valeur: Recodification prévue pour 2027-01-01 ; l'échéance 2026-09-01 n'est pas retenue pour cette fiche
unite: null
champ_application:
  objet: Calendrier de bascule des références de franchise françaises traitées dans cette V1
  conditions: Vérifier la version en vigueur et les correspondances avant la bascule effective
  exclusions: Autres dispositions TVA à calendrier particulier
date_debut: 2027-01-01
date_fin: null
statut: scheduled
source_ids: [SRC_FR_TVA_ORDONNANCE_CALENDRIER_20260729, SRC_FR_TVA_CGI_293_B, SRC_FR_TVA_CGI_293_D]
date_verification: 2026-09-09
notes: >-
  Le calendrier est confirmé par une disposition actuellement en vigueur,
  mais l'événement est futur : scheduled, pas une règle actuelle de substitution.
  Conserver la trace de l'annonce antérieure figurant dans la FAQ.
  Une simple recodification ne crée pas une obligation supplémentaire ;
  une identité de fond doit toutefois être vérifiée avant de relier les règles.
```

### Correspondances précises : contrôle séparé

La référence CIBS liée par la FAQ a été contrôlée et rejetée : sa version initialement prévue n’est pas applicable à la date de consultation. Les tentatives d’accès aux tables de concordance n’ont pas fourni de table exploitable. La lecture de textes futurs ne suffit pas à certifier ici une correspondance exhaustive, disposition par disposition.

```yaml
rule_id: FR_TVA_CORRESPONDANCES_CGI_CIBS_A_VERIFIER
juridiction: FR
categorie: correspondance_references
intitule: Correspondances précises CGI vers CIBS après le report
type: textuelle
valeur: null
unite: null
champ_application:
  objet: Migration des références utilisées dans les fiches de franchise
  conditions: Correspondance officielle précise et versions applicables requises
  periode_cible: Bascule prévue en 2027, non réalisée en septembre 2026
date_debut: null
date_fin: null
statut: needs_review
source_ids: [SRC_FR_TVA_ORDONNANCE_CALENDRIER_20260729, SRC_FR_TVA_CIBS_REFERENCE_ECARTEE, SRC_FR_TVA_IMPOTS_MICRO_2026]
date_verification: 2026-09-09
reference_historique: null
reference_actuelle: null
notes: >-
  Les champs de correspondance restent intentionnellement non renseignés.
  Les références CGI actuellement applicables sont enregistrées séparément.
  Ne pas transformer la référence ancienne liée par la FAQ en référence actuelle,
  ni produire une substitution automatique. La période du couple de références
  n'est pas validée ; le calendrier prévu est porté par la fiche scheduled.
```

## 8. Historique éventuel

Le fichier précédent était une fiche préparatoire sans règle ni valeur validée. Aucune donnée historique préexistante n’a été supprimée. Cette V1 ne reconstitue pas les seuils antérieurs et ne crée aucune entrée `superseded` sans valeur, période, champ et source établis.

Aucun seuil unique de substitution n’est enregistré comme règle applicable. Les règles actives utilisent exclusivement les quatre plafonds confirmés dans les sources. Une mesure annoncée, suspendue ou modifiée avant son entrée en vigueur ne doit pas être transformée artificiellement en ancienne règle appliquée.

L’ancienne annonce de recodification et la référence rejetée sont conservées comme événements documentaires, pas comme obligations successives. Lors des mises à jour, ajouter les nouvelles vérifications, conserver les anciennes sources et créer une version de règle seulement si son contenu ou son applicabilité change réellement.

## 9. Exclusions / needs_review

Hors périmètre : taux de TVA ; calculs de TVA collectée ou déductible ; déclarations ; régimes réels simplifié et normal détaillés ; franchise européenne PME ; opérations intracommunautaires et internationales ; autoliquidation ; TVA sur immobilisations ; avocats, auteurs et artistes-interprètes ; opérations immobilières particulières ; exonérations sectorielles ; DOM et autres territoires particuliers. Aucun de leurs seuils ou taux n’est reproduit.

Les activités saisonnières ou intermittentes et les calendriers particuliers restent à traiter séparément. La règle ordinaire de prorata ne leur est pas appliquée automatiquement. La qualification de l’hébergement, des opérations composites ou d’une base de CA ambiguë doit également être instruite avant usage.

La fiche `FR_TVA_CORRESPONDANCES_CGI_CIBS_A_VERIFIER` reste `needs_review`. Une situation hors champ ou insuffisamment documentée doit être signalée comme telle ; aucun résultat ne peut être présenté comme établi en choisissant arbitrairement la règle qui semble la plus plausible.

## 10. Contradictions et journal

### Création et prorata : divergence conservée

La page `SRC_FR_TVA_IMPOTS_REGIMES_2026` dispense de prorata pendant la première année et utilise les limites majorées ajustées pour l’accès à l’année suivante. Le BOFiP § 290–295 ajuste les majorés pour la création, puis les limites de base pour déterminer l’accès à la deuxième année ; seuls les majorés du suivi de cette deuxième année restent non ajustés.

Résolution pour la V1 : retenir la méthode précise du BOFiP, étayée par le III de l’article 293 D qui prévoit l’ajustement des plafonds lors d’un début en cours d’année, et par le tableau de l’article 293 B distinguant année précédente et année en cours. Ne pas fusionner ces formulations ; la page générale demeure enregistrée mais n’est pas la preuve retenue pour ces contrôles. Le statut `verified` couvre uniquement cette méthode et ce périmètre.

### Égalité au plafond

Certaines phrases du BOFiP utilisent les termes « atteinte » ou « atteint », alors que ses exemples et le CGI raisonnent en dépassement. Pour les bornes, la V1 retient le texte normatif : `<=` respecte le plafond, `>` le dépasse. Cette résolution vaut aussi pour les plafonds ajustés ; aucun arrondi inventé ne doit faire basculer un cas limite.

### Recodification et actualité des pages

La date annoncée dans la FAQ est antérieure au report vérifié dans l’article 49. La divergence de calendrier est résolue par le texte actualisé et le contrôle des versions CGI ; la correspondance précise avec les futures références reste `needs_review`. Un changement de numéro ne justifie ni l’invention d’un article ni la création de deux obligations distinctes.

### Journal initial de vérification

| Date | Sources et règles examinées | Résultat / contradiction | Statut |
| --- | --- | --- | --- |
| 2026-09-09 | BOFiP champ, FAQ micro, page régimes, CGI 293 B ; quatre plafonds | Montants et rôles confirmés ; date 2025-01-01 confirmée par impots.gouv.fr | `verified` |
| 2026-09-09 | FAQ micro, BOFiP § 130, CGI 293 B ; dépassement du seuil de base | Perte au 1er janvier suivant, sous les conditions documentées | `verified` |
| 2026-09-09 | FAQ micro, CGI 293 B, II ; dépassement majoré | Effet à la date du dépassement ; date impossible à déduire d'un seul total annuel | `verified` |
| 2026-09-09 | CGI 293 D, I ; BOFiP § 130 ; base HT | Base hors TVA confirmée ; absence d'équivalence universelle avec les flux bancaires | `verified` |
| 2026-09-09 | BOFiP § 285–295, CGI 293 B et 293 D, page régimes ; création et prorata | Méthode BOFiP retenue avec preuve normative ; divergence de la page générale conservée | `verified` dans le champ ordinaire |
| 2026-09-09 | BOFiP § 295 ; deuxième année | Base ajustée pour l'accès, majorés non ajustés pour le suivi | `verified` |
| 2026-09-09 | BOFiP § 130, 160 et 300, tableau CGI 293 B ; activité mixte | Deux contrôles cumulatifs, pour année précédente et année en cours, confirmés par le texte lié | `verified` |
| 2026-09-09 | FAQ micro et page régimes ; articulation micro/TVA | Régimes distincts ; aucune importation des plafonds micro | `verified` |
| 2026-09-09 | Article 49 actualisé et versions CGI ; calendrier de recodification | Report au 2027-01-01 confirmé ; ancienne annonce 2026-09-01 écartée | calendrier vérifié, bascule `scheduled` |
| 2026-09-09 | Référence CIBS liée par la FAQ et tentatives de concordance | Version liée non applicable ; correspondances exactes non validées | `needs_review` |

À chaque nouveau contrôle, ajouter un événement daté, les sources précises, le résultat, la contradiction éventuelle et le statut retenu. Une contradiction nouvelle non résolue fait passer la règle concernée à `needs_review` et bloque la conclusion qui en dépend. Ne pas effacer les vérifications précédentes, y compris dans un futur traitement automatisé.

## 11. Utilisation par les sous-skills

Les sous-skills peuvent examiner si la franchise paraît applicable à une date, signaler une proximité de plafond, constater un dépassement, identifier sa date lorsque les données le permettent et préparer une projection conditionnelle. Une proximité ne reçoit pas de pourcentage d’alerte réglementaire inventé.

Données nécessaires selon le contrôle :

```text
date_etudiee
categorie_activite
CA_HT_annee_precedente
CA_HT_cumule_annee_en_cours
date_et_montant_des_operations_si_recherche_du_depassement
date_creation_si_entreprise_nouvelle
ventilation_activite_mixte_si_applicable
jours_activite_et_annee_de_reference_si_prorata
statut_franchise_initial_et_eventuelle_option_TVA
qualification_des_operations_et_de_leur_rattachement_temporel
```

Une donnée manquante n’est jamais remplacée par zéro. Les dates d’opération utilisées doivent correspondre à la règle de rattachement applicable ; la date d’une entrée bancaire n’est pas présumée suffisante.

Avant utilisation :

1. Qualifier la situation et écarter les cas hors périmètre ; distinguer régime micro et TVA.
2. Choisir les règles `verified` couvrant la date et l’activité ; vérifier les sources et l’absence de contradiction ouverte.
3. Contrôler le CA de l’année précédente sur les limites de base, puis le CA cumulé courant sur les limites majorées ; en création, appliquer la méthode de la section 5.
4. En activité mixte, contrôler simultanément le global et la composante services. Un dépassement d’une limite pertinente suffit ; ne pas compenser entre catégories.
5. Pour une perte en cours d’année, conserver la première date de dépassement établie. Si seules les valeurs annuelles sont disponibles, signaler la date comme indisponible et limiter la conclusion.
6. Citer `rule_id`, `source_ids`, date de vérification, données retenues et réserves ; distinguer constat, calcul et projection.

Une fiche `needs_review` ne fonde pas de conclusion automatique. La recodification `scheduled` ne remplace pas les références CGI en 2026 et devra être revérifiée avant son utilisation effective. Les conditions d’une projection sur une année ultérieure doivent être recontrôlées ; la présence d’une fin inconnue ne suffit pas.

La fiche ne sert pas à calculer un montant de TVA à facturer, à choisir un taux, à déterminer une TVA déductible, à produire une déclaration ou à certifier la situation fiscale. Le renvoi vers [micro-entreprise.md](./micro-entreprise.md) ne dispense pas de vérifier le champ propre à cette autre fiche.

## 12. Statut V1

Sont `verified` dans le périmètre défini : les quatre plafonds, les deux effets de dépassement, la base HT, la distinction micro/TVA, la méthode de création et de prorata, l’accès et le suivi de deuxième année, ainsi que les doubles contrôles de l’activité mixte. La divergence relative à la création est documentée et résolue par recoupement normatif.

Le calendrier de report est vérifié ; la recodification future reste `scheduled` au 2027-01-01. Les correspondances précises CGI/CIBS restent `needs_review`. Aucun basculement au 2026-09-01 n’est validé par cette fiche.

Les taux et les calculs de TVA sont hors périmètre. Aucun moteur automatique n’est encore implémenté. Les règles documentées ne certifient pas une conformité fiscale complète et ne tranchent pas une situation juridique ambiguë.
