# Cotisations et contributions micro-sociales — Référentiel France V1 (2026)

## 1. Statut

Vérification au **2026-09-09**, selon [sources.md](./sources.md), avec les conventions de [micro-entreprise.md](./micro-entreprise.md) et [tva.md](./tva.md). Référentiel de pilotage, sans donnée propre à Kirexo ni certification d'un dossier fiscal ou social.

Les règles portent sur la France métropolitaine et les périodes 2026. Pour les taux ordinaires, le début au `2026-01-01` correspond à la version applicable de D613-4. Pour les règles de fonctionnement préexistantes, cette date délimite la couverture V1 et ne prétend pas dater leur création juridique. Les bornes sont inclusives ; `date_fin: null` signifie fin inconnue lors du contrôle, pas validité permanente. `unite: null` signifie non applicable pour un énoncé ; une `valeur: null` dans une fiche `needs_review` signifie absence de règle opérationnelle validée.

Le statut qualifie une règle dans son champ. Les taux ACRE exigent en plus une qualité de bénéficiaire établie, la bonne cohorte de création, une période encore ouverte et une base admise à l'exonération. La règle antérieure au 1er juillet peut continuer à s'appliquer après cette date aux bénéficiaires concernés : ne pas la fermer artificiellement au 30 juin.

## 2. Périmètre

Micro-social ordinaire : ventes éligibles, services BIC, BNC hors Cipav et professions effectivement affiliées à la Cipav. Sont couverts les taux globaux sociaux, base déclarée, ventilation qualifiée, CA nul, déclaration mensuelle/trimestrielle, ACRE et CFP séparée. L'éligibilité au régime micro se vérifie dans sa fiche propre ; la perte de franchise TVA n'implique pas à elle seule une sortie du micro-social.

Le taux de 6 % figurant au c du I de D613-4 pour le cas spécifique de location meublée touristique visé est documenté **hors périmètre opérationnel V1**. Aucun sous-skill général ne doit le sélectionner ; aucun taux ACRE de cette activité n'est ajouté. Les exclusions complémentaires sont en section 11.

## 3. Sources

Chaque fiche précise le passage utilisé. Les textes légaux ont été récupérés et leurs versions contrôlées ; les extraits administratifs partiels sont identifiés comme tels. Un résultat de simulation vide n'est pas une règle applicable. Les synthèses ci-dessous sont originales ; aucun tableau tiers complet ni texte juridique intégral n'est reproduit.

```yaml
source_id: "SRC_FR_SOC_D613_4_2026"
organisme: "Légifrance"
titre: "Article D613-4 du Code de la sécurité sociale"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000052218738"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2026-01-01"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Taux globaux, I, catégories a, b, d et e ; catégorie c exclue de l'usage opérationnel. Art. D613-4, CSS, version en vigueur depuis le 01/01/2026, LEGIARTI000052218738, applicable au 09/09/2026. Modification par le décret n° 2025-943 du 8 septembre 2025, application aux périodes commençant le 1er janvier 2026. Les montants intermédiaires du tableau ne sont pas des plafonds micro ni des bases forfaitaires à appliquer au dossier."
```

```yaml
source_id: "SRC_FR_SOC_ECONOMIE_2026"
organisme: "Ministère de l'Économie / Bercy infos Entreprises"
titre: "Micro-entreprises, quel est le montant de vos cotisations sociales ?"
url: "https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/micro-entreprises-quel-est-le-montant-de-vos-cotisations-sociales"
type_source: "secondaire_officielle"
date_publication: "2026-03-06"
date_mise_a_jour: null
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Date affichée : écrit le 06/03/2026. Tableaux des taux ordinaires 2025/2026, taux ACRE avant changement et CFP ; paragraphes déclaration, CA nul et frontière fiscale. Annonce ACRE à articuler avec le critère de création/reprise du décret. Le taux Cipav ACRE publié est 13,4 %, pas la moitié arithmétique du taux normal."
```

```yaml
source_id: "SRC_FR_SOC_URSSAF_DIAPORAMA_2026"
organisme: "Urssaf"
titre: "Vous souhaitez devenir… Auto-entrepreneur"
url: "https://www.urssaf.fr/files/live/sites/urssaffr/files/autres/Diaporama_Auto-entrepreneur.pdf"
type_source: "secondaire_officielle"
date_publication: null
date_mise_a_jour: null
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Édition portant Avril 2026 ; jour éditorial inconnu. Accès direct au PDF en erreur 502. Extrait indexé du document officiel effectivement lu : diapositive numérotée 17, tableau des créations à compter du 1er juillet 2026, durée et ajout de CFP. Le tableau intégral de cette diapositive donne 9,30 / 15,9 / 19,20 / 17,40 pour les quatre catégories V1. Les colonnes fiscales et leurs totaux ne sont pas repris. Consultation partielle, sans prétendre avoir contrôlé le PDF entier ; recoupement normatif obligatoire pour les taux."
```

```yaml
source_id: "SRC_FR_SOC_DECRET_ACRE_2026"
organisme: "Légifrance"
titre: "Décret n° 2026-69 du 6 février 2026 fixant le taux d'exonération prévu à l'article 23 de la loi n° 2025-1403 du 30 décembre 2025 de financement de la sécurité sociale pour 2026 et adaptant le taux de cotisations sociales des micro-entrepreneurs applicables dans le cadre de l'aide à la création et à la reprise d'entreprise"
url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053449085"
type_source: "primaire_texte_normatif"
date_publication: "2026-02-08"
date_mise_a_jour: "2026-02-09"
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Articles 2 et 3 lus en version initiale puis contrôle de l'article 3 consolidé : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000053449085/ . Changement applicable aux créations et reprises à compter du 01/07/2026. D131-6-3 actuel contrôlé séparément au 09/09/2026. Ne pas importer le régime des indépendants hors micro-social."
```

```yaml
source_id: "SRC_FR_SOC_D131_6_3_AVANT"
organisme: "Légifrance"
titre: "Article D131-6-3 du Code de la sécurité sociale — version antérieure"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041968018"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2020-05-25"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Art. D131-6-3, CSS, version du 25/05/2020 au 01/07/2026 exclu ; applicable au 30/06/2026, contrôle effectué le 09/09/2026. I : fraction de 50 %, arrondi supérieur au dixième et réserve du minimum L613-7 ; II : limite de base exonérable. Son maintien pour les créations antérieures découle du champ transitoire du décret, pas de la vigueur actuelle de cette version."
```

```yaml
source_id: "SRC_FR_SOC_D131_6_3_APRES"
organisme: "Légifrance"
titre: "Article D131-6-3 du Code de la sécurité sociale — version au 1er juillet 2026"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053451326"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2026-07-01"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Art. D131-6-3, CSS, version en vigueur depuis le 01/07/2026, LEGIARTI000053451326, applicable au 09/09/2026. I : fraction de 75 %, arrondi et réserve du minimum L613-7 ; II : limite de base ; III : renvoi aux modalités de demande. Conditions personnelles et démarches exhaustives non automatisées."
```

```yaml
source_id: "SRC_FR_SOC_L613_7"
organisme: "Légifrance"
titre: "Article L613-7 du Code de la sécurité sociale"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048683570"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2023-12-28"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Art. L613-7, CSS, version en vigueur depuis le 28/12/2023, LEGIARTI000048683570, applicable au 09/09/2026. I : base effectivement réalisée, périodicité, taux par catégorie, minimum du taux minoré et existence d'une option de cotisations minimales. Les abattements servant aux prestations ne sont pas des déductions à appliquer à la base sociale."
```

```yaml
source_id: "SRC_FR_SOC_D613_3"
organisme: "Légifrance"
titre: "Article D613-3 du Code de la sécurité sociale"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041967534"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2020-05-25"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Art. D613-3, CSS, version en vigueur depuis le 25/05/2020, LEGIARTI000041967534, applicable au 09/09/2026. Extension du micro-social aux personnes du 11° de R641-1 ; rapprochement Cipav confirmé par le tableau administratif dédié. Aucune affiliation individuelle n'est déduite du seul mot libéral."
```

```yaml
source_id: "SRC_FR_SOC_L131_6_4"
organisme: "Légifrance"
titre: "Article L131-6-4 du Code de la sécurité sociale"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053282569"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2026-01-01"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Art. L131-6-4, CSS, version en vigueur depuis le 01/01/2026, LEGIARTI000053282569, applicable au 09/09/2026. Conditions et demande d'ACRE ; non-cumul et antériorité à contrôler. Les conditions d'accès détaillées et tous leurs renvois ne sont pas instruits ici : la qualité de bénéficiaire doit être établie extérieurement, jamais présumée."
```

```yaml
source_id: "SRC_FR_SOC_CFP_L6331_48"
organisme: "Légifrance"
titre: "Article L6331-48 du Code du travail"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044056633"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2023-01-01"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Art. L6331-48, Code du travail, version en vigueur depuis le 01/01/2023, LEGIARTI000044056633, applicable au 09/09/2026. Alinéa spécifique L613-7 : CFP en sus, trois taux et qualification par renvoi aux 1° et 2°. Distinguer les artisans immatriculés au RNE des autres travailleurs ; ne pas reprendre les contributions forfaitaires des indépendants hors micro."
```

```yaml
source_id: "SRC_FR_SOC_D613_4_2025"
organisme: "Légifrance"
titre: "Article D613-4 du Code de la sécurité sociale — année 2025"
url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049624097"
type_source: "primaire_texte_normatif"
date_publication: null
date_mise_a_jour: null
date_debut_version: "2025-01-01"
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Art. D613-4, CSS, version du 01/01/2025 au 01/01/2026 exclu, LEGIARTI000049624097, applicable au 31/12/2025 et vérifiée le 09/09/2026. Catégorie e : historique BNC hors Cipav uniquement ; recoupé avec le tableau 2025 de Bercy."
```

```yaml
source_id: "SRC_FR_SOC_ECONOMIE_DIVERGENCE"
organisme: "Ministère de l'Économie / Bercy infos Entreprises"
titre: "Comment fonctionne la Sécurité sociale pour les indépendants ?"
url: "https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/comment-fonctionne-la-securite-sociale-pour-les-independants"
type_source: "secondaire_officielle"
date_publication: "2024-08-01"
date_mise_a_jour: null
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Date affichée : écrit le 01/08/2024 ; aucune mise à jour distincte établie. Encadré juillet 2024 : annonce BNC 26,1 % à partir du 01/01/2026, et Cipav 23,1 %. Conflits conservés en section 12 ; ne fonde aucun taux applicable V1."
```

```yaml
source_id: "SRC_FR_SOC_SERVICE_PUBLIC_ACRE"
organisme: "Direction de l'information légale et administrative / Service Public Entreprendre"
titre: "Aide à la création ou à la reprise d'une entreprise (Acre)"
url: "https://entreprendre.service-public.gouv.fr/vosdroits/F11677"
type_source: "secondaire_officielle"
date_publication: null
date_mise_a_jour: "2026-07-01"
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Rubrique micro-entrepreneur, vérifiée par l'éditeur le 01/07/2026 : durée jusqu'à la fin du troisième trimestre civil suivant le début, taux payé de 75 %, accès conditionnel. Ne pas confondre avec le volet autres créateurs. Exemple de septembre non nécessaire à la V1."
```

```yaml
source_id: "SRC_FR_SOC_URSSAF_BASE"
organisme: "Urssaf"
titre: "Mes premiers mois avec l’Urssaf"
url: "https://www.urssaf.fr/files/live/sites/urssaffr/files/LP/mespremiersmois/index.html"
type_source: "secondaire_officielle"
date_publication: null
date_mise_a_jour: null
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Extrait indexé officiel lu, parcours Auto-entrepreneur, Comprendre mes cotisations et Déclarer mon chiffre d'affaires : CA HT encaissé sans déduction de charges, CFP distincte calculée mensuellement ou trimestriellement. Accès direct ensuite en erreur ; ne pas utiliser les paragraphes du parcours travailleur indépendant."
```

```yaml
source_id: "SRC_FR_SOC_ECONOMIE_MIXTE"
organisme: "Ministère de l'Économie / Bercy infos Entreprises"
titre: "Micro-entreprise : peut-on exercer plusieurs activités ?"
url: "https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/micro-entreprise-peut-exercer-plusieurs-activites"
type_source: "secondaire_officielle"
date_publication: "2026-03-11"
date_mise_a_jour: null
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Rubrique calcul des cotisations des activités mixtes : ventilation explicite des activités commerciales/artisanales non libérales. Formulation différente pour le cumul libéral, suivie d'un exemple BNC ventilé ; généralisation non validée. Ne pas reprendre les autres développements ni leurs seuils."
```

```yaml
source_id: "SRC_FR_SOC_MON_ENTREPRISE_CIPAV"
organisme: "Urssaf / Mon-entreprise"
titre: "Taux CIPAV — Acre"
url: "https://mon-entreprise.urssaf.fr/documentation/dirigeant/auto%E2%80%91entrepreneur/Acre/taux-CIPAV"
type_source: "secondaire_officielle"
date_publication: null
date_mise_a_jour: null
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Arbre de règle indexé consulté : branche 2026 montrant 13,4 %. L'affichage global est Non applicable et la situation est vide ; aucune valeur de simulation n'est une preuve autonome. Contrôle complémentaire seulement, avec le taux publié par Bercy et les réserves légales ; la sélection exhaustive des branches reste à vérifier."
```

```yaml
source_id: "SRC_FR_SOC_SERVICE_PUBLIC_COTISATIONS"
organisme: "Direction de l'information légale et administrative / Service Public Entreprendre"
titre: "Cotisations sociales d'un micro-entrepreneur : ce qu'il faut savoir"
url: "https://entreprendre.service-public.gouv.fr/vosdroits/F36232"
type_source: "secondaire_officielle"
date_publication: null
date_mise_a_jour: "2026-01-01"
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Tableaux ordinaires et CA nul recoupés. La rubrique prestations inclut formation professionnelle dans une liste présentée comme couverte par le taux ; cette formulation ne permet pas d'intégrer la CFP au taux D613-4. Contradiction résolue par L6331-48."
```

```yaml
source_id: "SRC_FR_SOC_SERVICE_PUBLIC_CFP"
organisme: "Direction de l'information légale et administrative / Service Public Entreprendre"
titre: "Contribution à la formation professionnelle (CFP) des entrepreneurs individuels (y compris des micro-entrepreneurs)"
url: "https://entreprendre.service-public.gouv.fr/vosdroits/F23459"
type_source: "secondaire_officielle"
date_publication: null
date_mise_a_jour: "2026-01-01"
date_debut_version: null
date_consultation: "2026-09-09"
juridiction: "FR"
notes: "Tableau spécifique micro : recoupement des trois taux. Le paragraphe général de paiement en novembre n'est pas transposé au micro-social ; la documentation Urssaf et Bercy spécifique indique la périodicité mensuelle/trimestrielle. Divergence de présentation conservée."
```

## 4. Taux micro-sociaux ordinaires

Les quatre taux ci-dessous sont hors CFP et hors impôt, sans ACRE. Ils portent sur la base sociale qualifiée, sans appliquer les abattements figurant dans d'autres colonnes de D613-4.

```yaml
rule_id: "FR_SOC_NORMAL_VENTES_2026"
juridiction: "FR"
categorie: "taux_social_ordinaire"
intitule: "Taux ordinaire — Ventes BIC"
type: "numerique"
valeur: 12.3
unite: "% du CA"
champ_application: "Ventes relevant du 1° du 1 de l'article 50-0 du CGI, catégorie a de D613-4 ; hors locations et hébergement spécifiques exclus."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_ECONOMIE_2026"]
date_verification: "2026-09-09"
notes: "D613-4, I, catégorie correspondante, version 2026 contrôlée ; tableau Bercy 2026 concordant. Hors ACRE, CFP, versement libératoire et cas exclus. Le champ social doit être confirmé avant sélection."
```

```yaml
rule_id: "FR_SOC_NORMAL_SERVICES_BIC_2026"
juridiction: "FR"
categorie: "taux_social_ordinaire"
intitule: "Taux ordinaire — Prestations de services BIC"
type: "numerique"
valeur: 21.2
unite: "% du CA"
champ_application: "Prestations commerciales ou artisanales relevant du 2° du 1 de l'article 50-0 du CGI, catégorie d de D613-4 ; activité éligible et qualifiée."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_ECONOMIE_2026"]
date_verification: "2026-09-09"
notes: "D613-4, I, catégorie correspondante, version 2026 contrôlée ; tableau Bercy 2026 concordant. Hors ACRE, CFP, versement libératoire et cas exclus. Le champ social doit être confirmé avant sélection."
```

```yaml
rule_id: "FR_SOC_NORMAL_BNC_HORS_CIPAV_2026"
juridiction: "FR"
categorie: "taux_social_ordinaire"
intitule: "Taux ordinaire — BNC hors Cipav"
type: "numerique"
valeur: 25.6
unite: "% des recettes / CA déclaré selon la qualification applicable"
champ_application: "Activités relevant à la fois de L631-1 du CSS et du régime de l'article 102 ter du CGI, catégorie e de D613-4 ; affiliation au régime général établie."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_ECONOMIE_2026"]
date_verification: "2026-09-09"
notes: "D613-4, I, catégorie correspondante, version 2026 contrôlée ; tableau Bercy 2026 concordant. Hors ACRE, CFP, versement libératoire et cas exclus. Le champ social doit être confirmé avant sélection."
```

```yaml
rule_id: "FR_SOC_NORMAL_CIPAV_2026"
juridiction: "FR"
categorie: "taux_social_ordinaire"
intitule: "Taux ordinaire — Professions relevant de la Cipav"
type: "numerique"
valeur: 23.2
unite: "% du CA ou recettes qualifiés"
champ_application: "Affiliation effective à la section du 11° de R641-1, catégorie b de D613-4 ; accès au micro-social prévu par D613-3. Le seul qualificatif libéral ne suffit pas."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_D613_3"]
date_verification: "2026-09-09"
notes: "D613-4, I, catégorie correspondante, version 2026 contrôlée ; tableau Bercy 2026 concordant. Hors ACRE, CFP, versement libératoire et cas exclus. Le champ social doit être confirmé avant sélection."
```

## 5. Base et calcul

```yaml
rule_id: "FR_SOC_BASE_DECLAREE_2026"
juridiction: "FR"
categorie: "base_sociale"
intitule: "Base sociale effectivement réalisée et qualifiée"
type: "textuelle"
valeur: "Retenir le CA ou les recettes de la période déclarée, effectivement réalisés ; dans le fonctionnement ordinaire documenté par l'Urssaf, il s'agit du HT encaissé, sans déduction des charges."
unite: "EUR HT"
champ_application: "Micro-social dans les quatre catégories V1 ; période de rattachement, catégorie et encaissements professionnels qualifiés ; opérations atypiques non tranchées."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_L613_7","SRC_FR_SOC_URSSAF_BASE"]
date_verification: "2026-09-09"
notes: "L613-7, I ; parcours Auto-entrepreneur Urssaf, Déclarer mon chiffre d'affaires. Ni bénéfice comptable, ni solde bancaire, devis, CA TTC supposé ou facture non encaissée ne remplace automatiquement cette base. Ne pas déduire un abattement fiscal. Le rapprochement détaillé des remboursements, débours ou régularisations doit être instruit séparément."
```

Calcul conceptuel pour une activité simple :

```text
cotisations_sociales = base_declaree_qualifiee × taux_social_applicable / 100
```

Les valeurs numériques des fiches sont exprimées en pourcentage : `12.3` n'est pas un coefficient multiplicateur de `12.3`. Cette formule est un calcul dépendant des règles et des données, pas un nouveau taux officiel. Conserver période, base, versions, formule et hypothèses. Aucun arrondi de montant appelé n'est défini ici.

## 6. Activité mixte

```yaml
rule_id: "FR_SOC_MIXTE_VENTILATION_2026"
juridiction: "FR"
categorie: "activite_mixte"
intitule: "Application du taux à chaque fraction qualifiée"
type: "textuelle"
valeur: "Appliquer à chaque fraction de base déclarée le taux de la catégorie sociale dont elle relève, puis additionner les cotisations ainsi calculées."
unite: "EUR pour le résultat"
champ_application: "Activités de ventes et prestations commerciales/artisanales dont la ventilation sociale distincte est établie ; extension à un cumul libéral seulement après qualification séparée, non déduite ici."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_L613_7","SRC_FR_SOC_ECONOMIE_MIXTE"]
date_verification: "2026-09-09"
notes: "L613-7, I : taux par catégorie ; Bercy, rubrique calcul des activités mixtes, confirme la ventilation commerciale/artisanale. Le cumul avec une activité libérale fait l'objet de formulations non généralisables dans cette page : voir section 12. Une ventilation absente bloque le calcul ; aucun taux moyen ni taux de l'activité principale appliqué arbitrairement à tout le CA."
```

```text
cotisations_totales = somme(base_categorie_i × taux_i / 100)
```

C'est une formule de calcul, utilisable seulement après qualification des catégories et de leur régime. Elle ne décide ni l'affiliation sociale d'une activité secondaire ni la qualification CFP.

## 7. CA nul et déclaration

```yaml
rule_id: "FR_SOC_CA_NUL_2026"
juridiction: "FR"
categorie: "base_nulle"
intitule: "Cotisations proportionnelles nulles pour une base déclarée nulle"
type: "textuelle"
valeur: "Base déclarée et qualifiée égale à zéro : cotisations micro-sociales proportionnelles calculées égales à zéro."
unite: "EUR"
champ_application: "Fonctionnement normal du micro-social, hors option de cotisations minimales et hors dettes ou régularisations antérieures."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_L613_7","SRC_FR_SOC_ECONOMIE_2026"]
date_verification: "2026-09-09"
notes: "Bercy, paragraphe déclaration obligatoire et recettes nulles ; L613-7, I. L'existence d'une option pour des cotisations minimales est confirmée, mais ses conditions et calculs restent hors V1. Une absence de déclaration n'est jamais un CA nul."
```

```yaml
rule_id: "FR_SOC_DECLARATION_PERIODIQUE_2026"
juridiction: "FR"
categorie: "obligation_declarative"
intitule: "Déclaration mensuelle ou trimestrielle, même nulle"
type: "textuelle"
valeur: "Déclarer le CA ou les recettes chaque mois ou chaque trimestre selon l'option applicable ; la déclaration reste obligatoire lorsque la base est nulle."
unite: null
champ_application: "Micro-entrepreneur du périmètre V1 ; périodicité réellement choisie connue ; les premières échéances et dates calendaires précises ne sont pas calculées."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_L613_7","SRC_FR_SOC_ECONOMIE_2026"]
date_verification: "2026-09-09"
notes: "L613-7, I, et Bercy, déclaration. Le futur moteur doit distinguer zéro déclaré et donnée manquante. Aucun calendrier universel d'échéances n'est créé."
```

## 8. ACRE

### Principe : taux normal et taux ACRE distincts

```yaml
rule_id: "FR_SOC_ACRE_CONDITIONS_2026"
juridiction: "FR"
categorie: "eligibilite_ACRE"
intitule: "ACRE temporaire et conditionnelle"
type: "textuelle"
valeur: "L'ACRE ouvre une réduction temporaire sous conditions ; une création ne suffit pas à établir le droit à un taux réduit."
unite: null
champ_application: "Micro-social ; bénéficiaire établi, dates de création/reprise et début connues, période couverte, limites de base et situation sociale contrôlées."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_L131_6_4","SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_D131_6_3_APRES","SRC_FR_SOC_SERVICE_PUBLIC_ACRE"]
date_verification: "2026-09-09"
notes: "La V1 ne détermine pas automatiquement les conditions personnelles, démarches, non-cumuls ou antériorité. Si beneficiaire_ACRE est inconnu, ne pas appliquer de réduction ; le taux normal peut servir à un scénario explicite, pas à certifier la dette réelle."
```

### ACRE avant le 1er juillet : créations ou reprises antérieures au 2026-07-01

```yaml
rule_id: "FR_SOC_ACRE_COHORTE_AVANT_JUILLET_2026"
juridiction: "FR"
categorie: "ACRE_cohorte_avant"
intitule: "Fraction ACRE pour les créations antérieures au 1er juillet"
type: "textuelle"
valeur: "Fraction de 50 % du taux normal, avec arrondi légal du taux et respect du minimum prévu par L613-7 ; utiliser le taux publié de la catégorie."
unite: "% du taux normal, sous réserves"
champ_application: "Création ou reprise < 2026-07-01 ; périodes sociales 2026 encore couvertes par l'ACRE ; bénéficiaire et limite de base établis."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_L613_7"]
date_verification: "2026-09-09"
notes: "D131-6-3 antérieur, I, et article 3 du décret : les créations antérieures ne basculent pas à 75 % le 1er juillet. La fin de la version du code n'est pas la fin de leurs droits. Le minimum explique qu'une division universelle par deux n'est pas une méthode suffisante, notamment pour la Cipav."
```

```yaml
rule_id: "FR_SOC_ACRE_AVANT_VENTES_2026"
juridiction: "FR"
categorie: "taux_ACRE_avant"
intitule: "Taux ACRE antérieur — Ventes BIC"
type: "numerique"
valeur: 6.2
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise < 2026-07-01 ; même champ que FR_SOC_NORMAL_VENTES_2026."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_D613_4_2026"]
date_verification: "2026-09-09"
notes: "Taux publié dans le tableau ACRE Bercy du 06/03/2026, recoupé avec D131-6-3 et D613-4. Pour les ventes, 12.3 × 50 % donne 6.15 avant arrondi ; retenir 6.2 publié, sans arrondi personnel. Le taux n'est pas fermé au 30 juin pour un bénéficiaire encore couvert."
```

```yaml
rule_id: "FR_SOC_ACRE_AVANT_SERVICES_BIC_2026"
juridiction: "FR"
categorie: "taux_ACRE_avant"
intitule: "Taux ACRE antérieur — Prestations BIC"
type: "numerique"
valeur: 10.6
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise < 2026-07-01 ; même champ que FR_SOC_NORMAL_SERVICES_BIC_2026."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_D613_4_2026"]
date_verification: "2026-09-09"
notes: "Taux publié dans le tableau ACRE Bercy du 06/03/2026, recoupé avec D131-6-3 et D613-4. Pour les ventes, 12.3 × 50 % donne 6.15 avant arrondi ; retenir 6.2 publié, sans arrondi personnel. Le taux n'est pas fermé au 30 juin pour un bénéficiaire encore couvert."
```

```yaml
rule_id: "FR_SOC_ACRE_AVANT_BNC_HORS_CIPAV_2026"
juridiction: "FR"
categorie: "taux_ACRE_avant"
intitule: "Taux ACRE antérieur — BNC hors Cipav"
type: "numerique"
valeur: 12.8
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise < 2026-07-01 ; même champ que FR_SOC_NORMAL_BNC_HORS_CIPAV_2026."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_D613_4_2026"]
date_verification: "2026-09-09"
notes: "Taux publié dans le tableau ACRE Bercy du 06/03/2026, recoupé avec D131-6-3 et D613-4. Pour les ventes, 12.3 × 50 % donne 6.15 avant arrondi ; retenir 6.2 publié, sans arrondi personnel. Le taux n'est pas fermé au 30 juin pour un bénéficiaire encore couvert."
```

```yaml
rule_id: "FR_SOC_ACRE_AVANT_CIPAV_A_VERIFIER_2026"
juridiction: "FR"
categorie: "taux_ACRE_Cipav_a_verifier"
intitule: "Taux ACRE Cipav antérieur : confirmation du champ restant à achever"
type: "textuelle"
valeur: null
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise < 2026-07-01 et affiliation Cipav effective."
date_debut: "2026-01-01"
date_fin: null
statut: "needs_review"
source_ids: ["SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_MON_ENTREPRISE_CIPAV","SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_L613_7"]
date_verification: "2026-09-09"
notes: "Bercy publie 13.4 % ; l'arbre Mon-entreprise montre aussi cette valeur, mais sans contexte de simulation applicable ni vérification exhaustive des branches. D131-6-3 réserve le minimum L613-7 : ne pas remplacer ce taux par 23.2 / 2. Le détail permettant de confirmer indépendamment le minimum et le champ temporel Cipav n'a pas été entièrement établi. Valeur opérationnelle laissée nulle ; contrôle Urssaf qualifié requis."
```

### ACRE à compter du 1er juillet : créations ou reprises depuis le 2026-07-01

```yaml
rule_id: "FR_SOC_ACRE_COHORTE_APRES_JUILLET_2026"
juridiction: "FR"
categorie: "ACRE_cohorte_apres"
intitule: "Passage à une fraction payée de 75 %"
type: "textuelle"
valeur: "Pour une création ou reprise >= 2026-07-01, la fraction du taux normal à payer devient 75 %, sous arrondi légal et minimum ; l'exonération nominale correspond à 25 %, et non à une réduction de 75 %."
unite: "% du taux normal, sous réserves"
champ_application: "Micro-social ; bénéficiaire reconnu ; période couverte et limite exonérable contrôlée ; aucune bascule des cohortes antérieures."
date_debut: "2026-07-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_D131_6_3_APRES","SRC_FR_SOC_L613_7"]
date_verification: "2026-09-09"
notes: "Décret n° 2026-69, articles 2 et 3, et D131-6-3 en vigueur. Au 09/09/2026, le changement est applicable : verified et non scheduled. Le taux publié arrondi prime sur un produit décimal non arrondi."
```

```yaml
rule_id: "FR_SOC_ACRE_APRES_VENTES_2026"
juridiction: "FR"
categorie: "taux_ACRE_apres"
intitule: "Taux ACRE nouveau — Ventes BIC"
type: "numerique"
valeur: 9.3
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise >= 2026-07-01 ; même champ que FR_SOC_NORMAL_VENTES_2026."
date_debut: "2026-07-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_D131_6_3_APRES","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_URSSAF_DIAPORAMA_2026"]
date_verification: "2026-09-09"
notes: "Valeur publiée dans le tableau Urssaf, diapositive 17, extrait consulté pour créations à compter du 1er juillet ; recoupée avec les taux D613-4 et la fraction/arrondi de D131-6-3. Aucun montant de CFP ni d'impôt n'est inclus."
```

```yaml
rule_id: "FR_SOC_ACRE_APRES_SERVICES_BIC_2026"
juridiction: "FR"
categorie: "taux_ACRE_apres"
intitule: "Taux ACRE nouveau — Prestations BIC"
type: "numerique"
valeur: 15.9
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise >= 2026-07-01 ; même champ que FR_SOC_NORMAL_SERVICES_BIC_2026."
date_debut: "2026-07-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_D131_6_3_APRES","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_URSSAF_DIAPORAMA_2026"]
date_verification: "2026-09-09"
notes: "Valeur publiée dans le tableau Urssaf, diapositive 17, extrait consulté pour créations à compter du 1er juillet ; recoupée avec les taux D613-4 et la fraction/arrondi de D131-6-3. Aucun montant de CFP ni d'impôt n'est inclus."
```

```yaml
rule_id: "FR_SOC_ACRE_APRES_BNC_HORS_CIPAV_2026"
juridiction: "FR"
categorie: "taux_ACRE_apres"
intitule: "Taux ACRE nouveau — BNC hors Cipav"
type: "numerique"
valeur: 19.2
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise >= 2026-07-01 ; même champ que FR_SOC_NORMAL_BNC_HORS_CIPAV_2026."
date_debut: "2026-07-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_D131_6_3_APRES","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_URSSAF_DIAPORAMA_2026"]
date_verification: "2026-09-09"
notes: "Valeur publiée dans le tableau Urssaf, diapositive 17, extrait consulté pour créations à compter du 1er juillet ; recoupée avec les taux D613-4 et la fraction/arrondi de D131-6-3. Aucun montant de CFP ni d'impôt n'est inclus."
```

```yaml
rule_id: "FR_SOC_ACRE_APRES_CIPAV_2026"
juridiction: "FR"
categorie: "taux_ACRE_apres"
intitule: "Taux ACRE nouveau — Professions Cipav"
type: "numerique"
valeur: 17.4
unite: "% de la base sociale qualifiée"
champ_application: "Bénéficiaire ACRE établi ; période sociale 2026 dans la durée admise ; limite de base exonérable contrôlée ; hors CFP et impôt. Création ou reprise >= 2026-07-01 ; même champ que FR_SOC_NORMAL_CIPAV_2026."
date_debut: "2026-07-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D613_4_2026","SRC_FR_SOC_D131_6_3_APRES","SRC_FR_SOC_DECRET_ACRE_2026","SRC_FR_SOC_URSSAF_DIAPORAMA_2026"]
date_verification: "2026-09-09"
notes: "Valeur publiée dans le tableau Urssaf, diapositive 17, extrait consulté pour créations à compter du 1er juillet ; recoupée avec les taux D613-4 et la fraction/arrondi de D131-6-3. Aucun montant de CFP ni d'impôt n'est inclus."
```

### Durée, arrondi du taux et limite de base

```yaml
rule_id: "FR_SOC_ACRE_DUREE_2026"
juridiction: "FR"
categorie: "duree_ACRE"
intitule: "Terme de l'ACRE en trimestres civils"
type: "textuelle"
valeur: "Le taux minoré s'applique jusqu'à la fin du troisième trimestre civil suivant la date de début d'activité déclarée."
unite: null
champ_application: "Micro-entrepreneur bénéficiaire ; date de début établie ; choisir le taux selon la cohorte et la période ; ne pas étendre les montants 2026 sans recontrôle."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_SERVICE_PUBLIC_ACRE","SRC_FR_SOC_URSSAF_DIAPORAMA_2026","SRC_FR_SOC_ECONOMIE_2026"]
date_verification: "2026-09-09"
notes: "Rubrique micro de Service Public et diapositive Urssaf 17 concordantes. Ne pas remplacer ce terme par douze mois glissants : la durée dépend de la position du début dans le trimestre. Une période ACRE se prolongeant en 2027 ne valide pas à elle seule les taux de 2027."
```

```yaml
rule_id: "FR_SOC_ACRE_ARRONDI_TAUX_2026"
juridiction: "FR"
categorie: "arrondi_taux_ACRE"
intitule: "Arrondi réglementaire du taux ACRE"
type: "textuelle"
valeur: "La fraction du taux normal est arrondie au dixième de point de pourcentage supérieur, sans écarter le minimum de taux prévu par L613-7."
unite: "point de pourcentage"
champ_application: "Taux ACRE relevant de D131-6-3, version correspondant à la cohorte ; pas arrondi d'un montant de cotisations."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_D131_6_3_APRES","SRC_FR_SOC_L613_7"]
date_verification: "2026-09-09"
notes: "Règle expressément présente au I des deux versions ; elle n'est pas inventée à partir d'un exemple. Utiliser le taux officiel publié lorsqu'il est établi ; ne pas transformer cette règle en arrondi générique des paiements."
```

```yaml
rule_id: "FR_SOC_ACRE_LIMITE_BASE_2026"
juridiction: "FR"
categorie: "limite_base_ACRE"
intitule: "ACRE limitée à une base exonérable"
type: "textuelle"
valeur: "L'exonération est limitée au CA ou aux recettes correspondant, après les abattements visés par le texte, à un revenu égal au plafond de sécurité sociale auquel renvoie D131-6-3, II."
unite: null
champ_application: "Micro-social avec ACRE ; catégorie, période et base admise à l'exonération contrôlées ; aucun plafond monétaire ni calcul de dépassement validé dans cette V1."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_D131_6_3_APRES"]
date_verification: "2026-09-09"
notes: "Le II subsiste dans les deux versions. Une durée ACRE encore ouverte ne justifie pas un taux réduit sur une base illimitée. L'opérationnalisation chiffrée et le traitement d'un dépassement restent needs_review en section 11 : les taux validés ne suffisent pas à lever ce contrôle."
```

## 9. CFP

### CFP séparée des cotisations sociales

```yaml
rule_id: "FR_SOC_CFP_SEPARATION_2026"
juridiction: "FR"
categorie: "frontiere_CFP"
intitule: "CFP additionnelle au taux micro-social"
type: "textuelle"
valeur: "cotisations_sociales ≠ CFP ; la contribution à la formation professionnelle s'ajoute au prélèvement social calculé à partir de D613-4."
unite: null
champ_application: "Micro-social V1 ; qualification CFP et base propres établies ; périodicité mensuelle ou trimestrielle du dispositif."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_CFP_L6331_48","SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_URSSAF_BASE"]
date_verification: "2026-09-09"
notes: "L6331-48 prévoit expressément la contribution en sus. La CFP n'est incluse ni dans 12.3 / 21.2 / 25.6 / 23.2, ni dans les taux ACRE. Le paiement périodique est recoupé par la documentation administrative propre au micro-social."
```

```yaml
rule_id: "FR_SOC_CFP_COMMERCE_VENTES_2026"
juridiction: "FR"
categorie: "taux_CFP"
intitule: "CFP — Activité commerciale de vente"
type: "numerique"
valeur: 0.1
unite: "% du CA"
champ_application: "Personne non artisanale relevant du 1° de L6331-48 et de la première catégorie visée au renvoi à 50-0 ; vente commerciale qualifiée. Micro-social uniquement ; base CFP compatible et période connues."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_CFP_L6331_48","SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_SERVICE_PUBLIC_CFP"]
date_verification: "2026-09-09"
notes: "L6331-48, alinéa propre aux micro-entrepreneurs : catégorie juridique à contrôler, pas un choix automatique à partir de BIC/BNC. Le raccourci commercial / artisanal / libéral des pages explicatives est limité par ce champ. Les cumuls de qualifications CFP non résolus bloquent le calcul."
```

```yaml
rule_id: "FR_SOC_CFP_ARTISANAT_2026"
juridiction: "FR"
categorie: "taux_CFP"
intitule: "CFP — Activité artisanale"
type: "numerique"
valeur: 0.3
unite: "% du CA"
champ_application: "Travailleur du 2° de L6331-48, immatriculé au RNE en tant qu'entreprise du secteur des métiers et de l'artisanat ; qualification établie. Micro-social uniquement ; base CFP compatible et période connues."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_CFP_L6331_48","SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_SERVICE_PUBLIC_CFP"]
date_verification: "2026-09-09"
notes: "L6331-48, alinéa propre aux micro-entrepreneurs : catégorie juridique à contrôler, pas un choix automatique à partir de BIC/BNC. Le raccourci commercial / artisanal / libéral des pages explicatives est limité par ce champ. Les cumuls de qualifications CFP non résolus bloquent le calcul."
```

```yaml
rule_id: "FR_SOC_CFP_SERVICES_LIBERAL_2026"
juridiction: "FR"
categorie: "taux_CFP"
intitule: "CFP — Prestations de services et professions libérales concernées"
type: "numerique"
valeur: 0.2
unite: "% du CA"
champ_application: "Autres travailleurs du 1° de L6331-48 ; prestations non artisanales et professions libérales concernées, après qualification. Ne pas appliquer aux services artisanaux du 2°. Micro-social uniquement ; base CFP compatible et période connues."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_CFP_L6331_48","SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_SERVICE_PUBLIC_CFP"]
date_verification: "2026-09-09"
notes: "L6331-48, alinéa propre aux micro-entrepreneurs : catégorie juridique à contrôler, pas un choix automatique à partir de BIC/BNC. Le raccourci commercial / artisanal / libéral des pages explicatives est limité par ce champ. Les cumuls de qualifications CFP non résolus bloquent le calcul."
```

```yaml
rule_id: "FR_SOC_ACRE_CFP_MAINTENUE_2026"
juridiction: "FR"
categorie: "articulation_ACRE_CFP"
intitule: "CFP à ajouter pendant l'ACRE"
type: "textuelle"
valeur: "La CFP reste à ajouter pendant la période ACRE ; ne pas lui appliquer la réduction du taux social."
unite: null
champ_application: "Bénéficiaire ACRE dont la contribution CFP est applicable et qualifiée ; cohortes distinguées pour le taux social."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_CFP_L6331_48","SRC_FR_SOC_URSSAF_DIAPORAMA_2026","SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_D131_6_3_APRES"]
date_verification: "2026-09-09"
notes: "Le tableau Urssaf après juillet indique séparément l'ajout de CFP. L6331-48 fixe la contribution en sus et D131-6-3 réduit le taux social renvoyant à D613-4 ; aucun fondement consulté ne réduit la CFP."
```

```yaml
rule_id: "FR_SOC_FRONTIERE_IR_2026"
juridiction: "FR"
categorie: "frontiere_impot"
intitule: "Distinction des cotisations, de la CFP et du versement libératoire"
type: "textuelle"
valeur: "versement_liberatoire_IR ≠ cotisations_sociales ≠ CFP ; un recouvrement commun ne change pas leur nature."
unite: null
champ_application: "Tous les calculs de pilotage V1 ; versement libératoire exclu du calcul social et à traiter dans un référentiel fiscal distinct."
date_debut: "2026-01-01"
date_fin: null
statut: "verified"
source_ids: ["SRC_FR_SOC_ECONOMIE_2026","SRC_FR_SOC_CFP_L6331_48"]
date_verification: "2026-09-09"
notes: "La page Bercy distingue l'option fiscale, les cotisations et la CFP. Aucun taux fiscal ni calcul d'impôt n'est reproduit."
```

Calcul de pilotage possible, si les deux bases et règles sont compatibles :

```text
prelevements_sociaux_hors_impot = cotisations_micro_sociales + CFP
```

Le périmètre de ce total doit rester explicite : il ne comprend ni l'impôt ni toutes les autres charges possibles. Ne pas le présenter comme un taux Urssaf universel ou des charges totales définitives.

## 10. Historique

L'ancienne fiche était préparatoire et ne comportait aucune règle validée. Seul le taux BNC hors Cipav 2025 est historisé ; aucune reconstitution générale des taux n'est effectuée.

```yaml
rule_id: "FR_SOC_NORMAL_BNC_HORS_CIPAV_2025"
juridiction: "FR"
categorie: "taux_social_ordinaire"
intitule: "Ancien taux BNC hors Cipav en 2025"
type: "numerique"
valeur: 24.6
unite: "% des recettes / CA déclaré qualifiés"
champ_application: "Catégorie e de D613-4 : L631-1 et régime 102 ter ; hors Cipav, hors ACRE et CFP ; usage historique 2025 uniquement."
date_debut: "2025-01-01"
date_fin: "2025-12-31"
statut: "superseded"
source_ids: ["SRC_FR_SOC_D613_4_2025","SRC_FR_SOC_ECONOMIE_2026"]
date_verification: "2026-09-09"
notes: "Version normative couvrant exactement 2025 et tableau Bercy concordants. Vérification historique effectuée en 2026, sans simuler une consultation à l'époque. Remplacé pour les périodes 2026 par le taux ordinaire BNC correspondant."
remplace_par: "FR_SOC_NORMAL_BNC_HORS_CIPAV_2026"
```

Les règles ACRE de la cohorte antérieure restent utilisables dans leur champ documenté tant que les droits correspondants subsistent : elles ne sont pas marquées globalement `superseded` le 1er juillet. Le taux annoncé de 26,1 % n'est pas ajouté comme ancien taux effectivement appliqué. Conserver les preuves et les événements de vérification lors des mises à jour.

## 11. Exclusions / needs_review

Hors périmètre : calcul d'IR et du versement libératoire, TVA, droits sociaux détaillés et validation de trimestres de retraite, cotisations minimales optionnelles détaillées, indépendants hors micro-social, DROM, Mayotte, exonérations territoriales, salariés, conjoints et autres cas sociaux particuliers ; locations meublées touristiques et hébergement spécifique. Les frais consulaires et autres prélèvements ne sont pas inclus dans le total de pilotage.

Les conditions personnelles et démarches exhaustives de l'ACRE ne sont pas automatisées. Les bases comportant des opérations atypiques, qualifications CFP multiples ou affiliations sociales incertaines demandent une instruction propre. Une donnée manquante bloque le calcul concerné.

```yaml
rule_id: "FR_SOC_QUALIFICATIONS_MIXTES_A_VERIFIER_2026"
juridiction: "FR"
categorie: "qualification_mixte"
intitule: "Qualification des cumuls sociaux et CFP à instruire"
type: "textuelle"
valeur: null
unite: null
champ_application: "Cumuls impliquant une activité libérale, affiliation principale/secondaire non établie ou qualifications artisanales/commerciales/libérales CFP concurrentes."
date_debut: "2026-01-01"
date_fin: null
statut: "needs_review"
source_ids: ["SRC_FR_SOC_ECONOMIE_MIXTE","SRC_FR_SOC_L613_7","SRC_FR_SOC_CFP_L6331_48"]
date_verification: "2026-09-09"
notes: "La ventilation d'une base déjà qualifiée ne résout pas l'affiliation. La source Bercy mixte contient des formulations difficiles à généraliser ; ne pas appliquer son raccourci activité principale à tout le CA. Pour la CFP, instruire le rattachement au 1° ou au 2° et le périmètre de base, sans importer la ventilation sociale par analogie."
```

```yaml
rule_id: "FR_SOC_ACRE_PLAFONNEMENT_CALCUL_A_VERIFIER_2026"
juridiction: "FR"
categorie: "calcul_limite_ACRE"
intitule: "Calcul chiffré de la limite ACRE et du dépassement à vérifier"
type: "textuelle"
valeur: null
unite: null
champ_application: "Dossier nécessitant un plafond monétaire ACRE, un traitement de dépassement, une durée partielle ou un cumul de catégories pour apprécier la limite."
date_debut: "2026-01-01"
date_fin: null
statut: "needs_review"
source_ids: ["SRC_FR_SOC_D131_6_3_AVANT","SRC_FR_SOC_D131_6_3_APRES"]
date_verification: "2026-09-09"
notes: "L'existence de la limite est vérifiée ; son paramétrage chiffré et tous les renvois nécessaires ne sont pas instruits dans cette V1. Ne pas supposer la totalité du CA exonérable. Exiger une base admise et une limite contrôlées extérieurement, sinon bloquer le calcul réduit."
```

La fiche `FR_SOC_ACRE_AVANT_CIPAV_A_VERIFIER_2026` constitue le troisième point `needs_review` : le taux publié de 13.4 % est conservé comme observation, sans devenir une valeur opérationnelle validée.

## 12. Contradictions et journal

### BNC : 25,6 % contre 26,1 %

La page générale Bercy, écrite le 01/08/2024, annonce 26,1 % à partir du 01/01/2026 dans son encadré sur les micro-entrepreneurs BNC. Le champ paraît correspondre au BNC hors Cipav, distingué du paragraphe Cipav voisin. La page dédiée du 06/03/2026 donne 25,6 %, comme D613-4, I-e, effectivement applicable en 2026. Le texte normatif actuel tranche : retenir **25.6**, conserver l'annonce divergente, sans créer une règle historique à 26.1. Aucune date de mise à jour récente de la page générale n'a été établie.

La même page générale indique 23,1 % pour la Cipav ; pour 2026, D613-4, I-b, et le tableau dédié établissent 23,2 %. Cette autre divergence ne doit pas contaminer le taux Cipav ordinaire.

### ACRE : date de création, Cipav et taux payé

L'annonce abrégée de Bercy relative au 1er juillet ne suffit pas à sélectionner le taux : les articles 2 et 3 du décret imposent le critère de création/reprise. Le calendrier est résolu pour les deux cohortes ; aucune perte anticipée de l'ancien régime n'est déduite du seul changement de date.

Pour la Cipav avant juillet, 13.4 % est publié par Bercy et visible dans une branche Urssaf Mon-entreprise. Ce n'est pas une preuve que toute simulation vide est applicable. Le minimum réservé par L613-7 interdit la simple division de 23.2 par deux ; son contrôle numérique complet n'a pas été réalisé ici. Le point reste `needs_review`, sans remplacer la valeur par un taux arithmétique supposé. Les quatre taux après juillet sont recoupés avec le tableau Urssaf et la règle normative, sous leurs conditions.

### CFP : champ et périodicité

Les raccourcis des pages administratives ne suffisent pas : une prestation artisanale n'est pas automatiquement soumise au taux de 0.2 %. Le rattachement juridique prévu par L6331-48 décide de la catégorie CFP. La liste formation professionnelle de la fiche Service Public sur les cotisations ne permet pas d'inclure la CFP dans les taux globaux : le texte la prévoit séparément.

La fiche Service Public CFP comporte un paragraphe général de paiement en novembre, alors que la documentation propre au micro-social de Bercy et de l'Urssaf prévoit la périodicité mensuelle/trimestrielle. Cette formulation générale n'est pas transposée ici ; aucun calendrier de novembre n'est créé pour le micro-social V1.

### Activité mixte : ventilation et affiliation

La page Bercy du 11/03/2026 confirme la ventilation commerciale/artisanale, mais évoque l'activité principale pour un cumul libéral puis donne un exemple avec ventilation BNC. La V1 ne fusionne pas ces propositions : le principe de calcul sur fractions qualifiées est établi, la qualification générale des cumuls libéraux reste ouverte. Cette limite concorde avec celle de `micro-entreprise.md` et ne modifie pas les contrôles TVA distincts.

### Traçabilité des accès et versions

Un résultat web initial pour D613-4 utilisait un ancien identifiant alors que le rendu montrait un texte actuel. Le contrôle par l'API a révélé que cet identifiant concernait une version non applicable ; seule la version 2026 réellement récupérée figure comme source du taux actuel. Les erreurs d'accès Urssaf sont déclarées dans les fiches sources, sans prétendre à une lecture intégrale. Les passages indexés servent de recoupement limité ; les sources légales ou administratives directement accessibles portent les autres contrôles.

### Journal initial de vérification

| Date | Sources et règles examinées | Résultat / contradiction | Statut |
| --- | --- | --- | --- |
| 2026-09-09 | D613-4 actuel, Bercy dédié, Service Public ; quatre taux ordinaires | Version et catégories confirmées ; BNC 26,1 et Cipav 23,1 de la page générale écartés pour 2026 | `verified` |
| 2026-09-09 | L613-7 et Urssaf, base ; Bercy, déclaration et CA nul | Base qualifiée, périodicité et zéro déclaré distingués ; option minimale exclue du calcul ordinaire | `verified` |
| 2026-09-09 | L613-7 et Bercy activités mixtes | Ventilation validée sur catégories établies ; qualification du cumul libéral non généralisée | `verified` / `needs_review` selon champ |
| 2026-09-09 | D131-6-3 avant/après, décret 2026-69 art. 2–3 | Deux cohortes de création ; maintien de l'ancien régime dans son champ, pas bascule universelle | `verified` |
| 2026-09-09 | Bercy ACRE, D613-4 et D131-6-3 antérieur | 6.2 / 10.6 / 12.8 publiés et recoupés ; pas d'arrondi inventé | `verified` |
| 2026-09-09 | Bercy, arbre Mon-entreprise Cipav, L613-7 | 13.4 publié mais minimum et sélection exhaustive du champ non complètement établis | `needs_review` |
| 2026-09-09 | D131-6-3 actuel, D613-4, extrait Urssaf diapositive 17 | 9.3 / 15.9 / 19.2 / 17.4 recoupés pour créations depuis juillet ; lecture PDF partielle signalée | `verified` dans le champ borné |
| 2026-09-09 | Service Public ACRE, Bercy, extrait Urssaf | Terme en trimestres civils confirmé ; pas douze mois glissants systématiques | `verified` |
| 2026-09-09 | D131-6-3, I et II, et L613-7 | Arrondi du taux et limite de base confirmés ; paramétrage monétaire du plafond non instruit | principe `verified`, calcul `needs_review` |
| 2026-09-09 | L6331-48, Bercy, Urssaf et Service Public CFP | Trois taux qualifiés, CFP distincte et à ajouter pendant ACRE ; formulations générales non transposées | `verified` ; qualifications ambiguës réservées |
| 2026-09-09 | Bercy, L6331-48 | IR, cotisations et CFP distingués ; aucun taux fiscal extrait | `verified` |
| 2026-09-09 | D613-4 version 2025 et tableau Bercy | BNC hors Cipav 24.6, période exacte 2025 | `superseded` |

Conserver les événements lors des contrôles ultérieurs. Toute contradiction nouvelle non résolue impose `needs_review` pour la règle concernée et bloque le résultat qui en dépend. Contrôle interdocuments : aucune règle de seuil micro ou TVA n'est importée comme taux social ; les cas exclus et la séparation des bases sont conservés. Contrôle source/conséquence : montant, catégorie, période, cohorte et réserve sont examinés séparément ; aucun dossier individuel n'est réputé qualifié.

## 13. Utilisation par les sous-skills

La fiche peut alimenter des prévisions de charges, trésorerie, tarification, seuil de rentabilité et synthèses de gestion. Un CA prévisionnel multiplié par un taux demeure une **prévision**, pas une cotisation réellement appelée. Un devis, un pipeline CRM ou une facture émise ne devient pas une base sociale réalisée.

Données minimales selon le calcul :

```text
date_etudiee
categorie_sociale
base_declaree
periode_declaration
periodicite_mensuelle_ou_trimestrielle
activite_mixte_ventilation_si_applicable
beneficiaire_ACRE
date_debut_activite_si_ACRE
date_creation_ou_reprise_si_ACRE
date_operation_ou_periode_declaration_si_ACRE
fin_periode_ACRE_et_limite_base_exonerable_controlees_si_ACRE
qualification_CFP
base_CFP_compatible
```

Une donnée nécessaire inconnue bloque le calcul concerné ; jamais de remplacement par zéro. Un bénéfice ACRE non établi empêche le taux réduit ; une ventilation non qualifiée empêche le calcul mixte ; un rattachement CFP incertain empêche ce poste.

Avant calcul, vérifier le régime, la catégorie sociale et la base, puis la période de chaque règle. En ACRE, contrôler la cohorte, la durée, le taux et la limite exonérable ; ne pas résoudre les fiches `needs_review` par une hypothèse silencieuse. Calculer séparément cotisations et CFP, puis un total seulement si les bases sont compatibles. Conserver les `rule_id`, `source_ids`, dates de vérification et données utilisées. Une projection sur 2027 exige une vérification des taux de cette année même si les dates de fin restent nulles.

Les taux ordinaires et les taux ACRE sont des alternatives pour la fraction concernée, pas deux prélèvements à additionner. L'ancien taux BNC ne sert qu'à l'historique 2025. Les calculs réels ou prévisionnels sont distingués des règles officielles et des appels effectifs de l'Urssaf.

## 14. Statut V1

La fiche contient **27 règles `verified`**, **1 règle `superseded`** et **3 règles `needs_review`**.

Sont vérifiés dans leur champ : quatre taux ordinaires, base sociale, ventilation qualifiée, CA nul et déclaration, principe ACRE, deux cohortes, trois taux ACRE antérieurs hors Cipav, quatre taux ACRE nouveaux, durée, arrondi du taux, existence d'une limite de base, CFP séparée, trois taux CFP, maintien de CFP pendant ACRE et frontière avec l'impôt. L'historique est limité au BNC hors Cipav 2025.

Restent `needs_review` : taux ACRE Cipav antérieur, qualifications mixtes sociales/CFP non établies et calcul chiffré du plafonnement ACRE. Le statut vérifié d'un taux ne suffit pas à certifier son application à un dossier incomplet.

Le changement ACRE du **2026-07-01** est traité selon la date de création/reprise. CFP et cotisations restent séparées ; le versement libératoire est exclu du calcul social. Aucun moteur automatique n'est implémenté. Aucun taux fiscal, donnée Kirexo ou calcul de droits sociaux détaillés n'est ajouté.
