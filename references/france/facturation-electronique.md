# Facturation électronique et e-reporting — Référentiel France V1 (2026)

## 1. Statut

Situation de référence : **2026-09-10**. Cette V1 sépare obligations actuelles, futures et points non instruits. Elle n'implémente ni API, ni plateforme, ni formats détaillés. Les règles sont à articuler avec [facturation.md](./facturation.md), [tva.md](./tva.md) et [livre-recettes.md](./livre-recettes.md).

## 2. Périmètre

Sont couverts le calendrier, e-invoicing, e-reporting, franchise en base, plateforme agréée, solution compatible, annuaire, formats, PDF, B2C et frontière internationale. Les opérations internationales complexes, fréquences, données de paiement détaillées et sanctions complètes restent hors V1.

## 3. Sources

~~~yaml
sources:
  - source_id: SRC_FR_EFACT_DGFIP_DECOUVERTE_2026
    organisme: impots.gouv.fr / DGFiP
    titre: Je découvre la facturation électronique
    url: https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique
    type_source: secondaire_officielle
    date_mise_a_jour: 2026-05-26
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Champ, franchise, calendrier, e-invoicing, e-reporting et formats."
  - source_id: SRC_FR_EFACT_DGFIP_PLATEFORMES_2026
    organisme: impots.gouv.fr / DGFiP
    titre: Facturation électronique et plateformes agréées
    url: https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees
    type_source: secondaire_officielle
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Immatriculation, fonctions réglementées, solution compatible et rôle des plateformes."
  - source_id: SRC_FR_EFACT_BERCY_REFORME_2026
    organisme: Ministère de l'Économie
    titre: "Facturation électronique entre entreprises : coup d'envoi de la réforme"
    url: https://www.economie.gouv.fr/actualites/facturation-electronique-entre-entreprises-coup-denvoi-de-la-reforme
    type_source: secondaire_officielle
    date_publication: 2026-09-01
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Preuve administrative complémentaire de l'obligation actuelle de réception."
  - source_id: SRC_FR_EFACT_ORDONNANCE_CALENDRIER_20260729
    organisme: Légifrance
    titre: Article 49 de l'ordonnance n° 2025-1247 du 17 décembre 2025 — version modifiée
    url: https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000054587047
    type_source: primaire_texte_normatif
    date_debut_version: 2026-07-29
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Ordonnance n° 2025-1247, article 49 modifié par l'ordonnance n° 2026-671 du 27 juillet 2026, article 17 : entrée en vigueur générale reportée au 2027-01-01, avec exceptions propres à certaines dispositions. Ne pas en déduire une correspondance CGI/CIBS non vérifiée."
  - source_id: SRC_FR_EFACT_CGI_289_BIS_2026
    organisme: Légifrance
    titre: Article 289 bis du Code général des impôts
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044051178
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000044051178
    date_debut_version: 2026-02-21
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Champ domestique assujetti, forme électronique, plateforme agréée et annuaire. La version contrôlée reste affichée comme applicable au 2026-09-10 ; le calendrier général de recodification est reporté au 2027-01-01 par l'article 49 actualisé. Sa future reprise dans le CIBS n'est pas inventée."
  - source_id: SRC_FR_EFACT_CGI_289_E_2026
    organisme: Légifrance
    titre: Article 289 E du Code général des impôts
    url: https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000053531031/2026-02-21
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000053531031
    date_debut_version: 2026-02-21
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Transmission des données de factures électroniques par plateforme agréée ; périodicité renvoyée au décret."
  - source_id: SRC_FR_EFACT_CGI_290_2026
    organisme: Légifrance
    titre: Article 290 du Code général des impôts
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053546668
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000053546668
    date_debut_version: 2026-02-21
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Transmission de données pour opérations hors e-invoicing ; plateforme agréée ; modalités renvoyées à décret."
  - source_id: SRC_FR_EFACT_ANN2_242_NONIES_B_2026
    organisme: Légifrance
    titre: Article 242 nonies B de l'annexe II au CGI
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049330326
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000049330326
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Clauses de calendrier différant au 01/09/2027 certaines obligations pour microentreprises et PME."
~~~

## 4. Terminologie

~~~text
plateforme_agreee ≠ solution_compatible
e_invoicing ≠ e_reporting
~~~

Une plateforme agréée est immatriculée par l'administration fiscale et habilitée pour les fonctions prévues par la réforme. Une solution compatible peut servir d'intermédiaire technique, mais sans immatriculation elle ne peut pas assurer directement réception, transmission des factures ou des données pour l'administration. Le terme canonique V1 est « plateforme agréée » ; PDP est seulement historique.

## 5. Entreprises concernées

~~~yaml
rules:
  - rule_id: FR_EFACT_ASSUJETTIS_FRANCHISE_CONCERNES_2026
    juridiction: FR
    categorie: champ_reforme
    intitule: Assujettis et franchise en base
    type: textuelle
    valeur: "Les entreprises assujetties à la TVA sont concernées, y compris celles bénéficiant de la franchise en base et les micro-entrepreneurs."
    unite: null
    champ_application: "Champ général décrit par DGFiP ; qualification de l'assujettissement à vérifier."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_DGFIP_DECOUVERTE_2026]
    date_verification: 2026-09-10
    notes: "franchise_en_base_TVA ≠ exclusion_de_la_reforme ; micro-fiscal et catégorie de taille de réforme restent deux notions distinctes."
~~~

## 6. Champ e-invoicing

~~~yaml
rules:
  - rule_id: FR_EFACT_EINVOICING_CHAMP_DOMESTIQUE_2026
    juridiction: FR
    categorie: e_invoicing
    intitule: Champ principal domestique
    type: textuelle
    valeur: "Opérations entre assujettis établis, domiciliés ou résidents habituellement en France, sous forme électronique et via plateforme agréée."
    unite: null
    champ_application: "Opérations de CGI 289 bis ; vérifier opération, assujettissement et établissement des deux parties."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_CGI_289_BIS_2026, SRC_FR_EFACT_DGFIP_DECOUVERTE_2026]
    date_verification: 2026-09-10
    notes: "Ne résumer ni par « B2B » seul ni par la seule nationalité."
~~~

## 7. Réception depuis septembre 2026

~~~yaml
rules:
  - rule_id: FR_EFACT_RECEPTION_ENTREPRISES_20260901
    juridiction: FR
    categorie: reception
    intitule: Capacité de recevoir les factures électroniques
    type: textuelle
    valeur: "Toutes les entreprises concernées doivent être en capacité de recevoir des factures électroniques par l'intermédiaire d'une plateforme agréée."
    unite: null
    champ_application: "Entreprises assujetties concernées ; y compris micro-entreprises et entreprises sans émission de facture."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_DGFIP_DECOUVERTE_2026, SRC_FR_EFACT_DGFIP_PLATEFORMES_2026, SRC_FR_EFACT_BERCY_REFORME_2026]
    date_verification: 2026-09-10
    notes: "Obligation actuelle au 10/09/2026. Les factures fournisseurs sont concernées ; une boîte email ou un PDF reçu par email ne constitue pas le canal réglementé."
~~~

## 8. Émission micro septembre 2027

~~~yaml
rules:
  - rule_id: FR_EFACT_EMISSION_MICRO_20270901
    juridiction: FR
    categorie: microentreprise_categorie_taille_reforme
    intitule: Émission électronique micro/PME
    type: textuelle
    valeur: "Obligation d'émettre électroniquement les factures dans le champ de la réforme."
    unite: null
    champ_application: "Microentreprises et PME concernées par le calendrier différé ; vérifier taille et champ."
    date_debut: 2027-09-01
    date_fin: null
    statut: scheduled
    source_ids: [SRC_FR_EFACT_DGFIP_DECOUVERTE_2026, SRC_FR_EFACT_ANN2_242_NONIES_B_2026]
    date_verification: 2026-09-10
    notes: "Non obligatoire pour ces entreprises au 10/09/2026. Une entrée volontaire anticipée est annoncée par Bercy, sans transformer ce calendrier en obligation actuelle."
~~~

## 9. Plateformes agréées et solutions compatibles

~~~yaml
rules:
  - rule_id: FR_EFACT_PLATEFORME_FONCTIONS_2026
    juridiction: FR
    categorie: plateforme_agreee
    intitule: Fonctions réglementées de plateforme
    type: textuelle
    valeur: "Émission, transmission et réception des factures électroniques ; transmission des données de factures, transactions et paiement."
    unite: null
    champ_application: "Plateforme immatriculée par l'administration fiscale."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_DGFIP_PLATEFORMES_2026]
    date_verification: 2026-09-10
    notes: "Aucun fournisseur commercial n'est recommandé. Une solution compatible non immatriculée ne devient pas plateforme agréée parce qu'elle produit Factur-X."
~~~

## 10. Formats et facture électronique

~~~yaml
rules:
  - rule_id: FR_EFACT_FORMATS_NORMES_2026
    juridiction: FR
    categorie: format_facture
    intitule: Formats admis au niveau V1
    type: textuelle
    valeur: "UBL ; CII ; format mixte comportant données structurées et fichier image."
    unite: null
    champ_application: "Facture électronique au sens de la réforme ; catalogue et mapping hors V1."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_DGFIP_DECOUVERTE_2026]
    date_verification: 2026-09-10
    notes: "Factur-X peut être un exemple de format mixte ; aucun format unique n'est imposé."
  - rule_id: FR_EFACT_PDF_NON_EQUIVALENT_2026
    juridiction: FR
    categorie: e_invoicing
    intitule: PDF ordinaire insuffisant
    type: textuelle
    valeur: "PDF ordinaire, document scanné ou document envoyé par mail ne répondent pas seuls à la qualification de facture électronique réglementée."
    unite: null
    champ_application: "Qualification dans la réforme, non-validité de la facture classique non tranchée ici."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_DGFIP_DECOUVERTE_2026, SRC_FR_EFACT_BERCY_REFORME_2026]
    date_verification: 2026-09-10
    notes: "La facture réglementée comporte des données structurées et emprunte le circuit de plateforme agréée."
~~~

## 11. E-reporting

~~~yaml
rules:
  - rule_id: FR_EFACT_EREPORTING_PRINCIPE_2026
    juridiction: FR
    categorie: e_reporting
    intitule: Transmission des données hors e-invoicing
    type: textuelle
    valeur: "Transmission à l'administration de données relatives à des opérations qui ne relèvent pas nécessairement du e-invoicing domestique."
    unite: null
    champ_application: "CGI 290 et champ précisé par la DGFiP ; données transmises par plateforme agréée."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_CGI_290_2026, SRC_FR_EFACT_DGFIP_DECOUVERTE_2026]
    date_verification: 2026-09-10
    notes: "e_invoicing ≠ e_reporting ; périodicité non créée dans cette V1."
  - rule_id: FR_EFACT_EREPORTING_MICRO_20270901
    juridiction: FR
    categorie: microentreprise_categorie_taille_reforme
    intitule: E-reporting micro/PME
    type: textuelle
    valeur: "Transmission des données de transaction selon le calendrier général différé."
    unite: null
    champ_application: "Microentreprises et PME concernées ; qualification de l'opération nécessaire."
    date_debut: 2027-09-01
    date_fin: null
    statut: scheduled
    source_ids: [SRC_FR_EFACT_DGFIP_DECOUVERTE_2026, SRC_FR_EFACT_ANN2_242_NONIES_B_2026]
    date_verification: 2026-09-10
    notes: "Ne pas confondre avec l'obligation actuelle de réception."
~~~

## 12. B2C

~~~yaml
rules:
  - rule_id: FR_EFACT_B2C_EREPORTING_CONCEPT_2026
    juridiction: FR
    categorie: B2C
    intitule: B2C et e-reporting
    type: textuelle
    valeur: "Les ventes et prestations à des personnes non assujetties relèvent du e-reporting de transaction dans le champ applicable."
    unite: null
    champ_application: "Opérations définies par CGI 290 ; ne pas qualifier automatiquement toute vente B2C."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_CGI_290_2026, SRC_FR_EFACT_DGFIP_DECOUVERTE_2026]
    date_verification: 2026-09-10
    notes: "Ne pas envoyer automatiquement une facture électronique réglementée au particulier."
~~~

## 13. International

Les opérations avec un opérateur étranger peuvent sortir du e-invoicing domestique et entrer dans le e-reporting. Leur qualification détaillée n'est pas automatisée.

## 14. Données de paiement

La DGFiP vise les opérations dont la TVA est exigible à l'encaissement dans son e-reporting de paiement. Cette V1 ne crée ni fréquence, ni champ universel : le montant encaissé et le calendrier exact doivent être sélectionnés selon l'opération et le régime.

## 15. Annuaire et adressage

~~~yaml
rules:
  - rule_id: FR_EFACT_ANNUAIRE_CENTRAL_2026
    juridiction: FR
    categorie: adressage
    intitule: Annuaire central
    type: textuelle
    valeur: "L'État met un annuaire central à disposition des plateformes agréées pour l'adressage des factures vers la plateforme du destinataire."
    unite: null
    champ_application: "Article 289 bis CGI ; syntaxe, API et identifiants hors V1."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_EFACT_CGI_289_BIS_2026]
    date_verification: 2026-09-10
    notes: "Ne crée aucun moteur d'annuaire."
~~~

## 16. Articulation avec facturation classique

~~~text
obligation_reception_2026 ≠ obligation_emission_micro_2027
facture_electronique ≠ recette_encaissee
facture_emise ≠ facture_payee ≠ recette_encaissee
~~~

Avant l'échéance d'émission, une micro-entreprise conserve les règles classiques de [facturation.md](./facturation.md), sauf entrée volontaire ou situation particulière. Les quatre données liées à la réforme sont référencées comme échéance 2027, sans créer une règle classique contradictoire.

## 17. Recodification et transitions

La recodification générale de la TVA initialement prévue au 2026-09-01 a été reportée au 2027-01-01 par l'article 49 de l'ordonnance n° 2025-1247, dans sa version issue de l'ordonnance n° 2026-671 du 27 juillet 2026. Au 2026-09-10, les références CGI de cette V1 sont donc contrôlées selon leurs versions effectivement applicables à cette date.

Certaines dispositions suivent un calendrier propre ou un mécanisme particulier de maintien ou de reprise. Aucune correspondance CGI/CIBS n'est créée sans source exacte. Ce calendrier de recodification est distinct de l'entrée en vigueur, le 2026-09-01, de l'obligation de réception des factures électroniques.

## 18. Exclusions / needs_review

~~~yaml
rules:
  - rule_id: FR_EFACT_INTERNATIONAL_QUALIFICATION_A_VERIFIER
    juridiction: FR
    categorie: international
    intitule: Qualification internationale détaillée
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Opérations étrangères, intracommunautaires et exceptions."
    date_debut: 2026-09-10
    date_fin: null
    statut: needs_review
    source_ids: [SRC_FR_EFACT_CGI_290_2026]
    date_verification: 2026-09-10
    notes: "Pas d'automatisation internationale V1."
  - rule_id: FR_EFACT_PAIEMENT_FREQUENCE_A_VERIFIER
    juridiction: FR
    categorie: e_reporting_paiement
    intitule: Données de paiement et fréquence
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Champ micro, périodicité et modalités à établir par les textes d'application."
    date_debut: 2026-09-10
    date_fin: null
    statut: needs_review
    source_ids: [SRC_FR_EFACT_DGFIP_DECOUVERTE_2026, SRC_FR_EFACT_CGI_289_E_2026]
    date_verification: 2026-09-10
    notes: "Aucune fréquence quotidienne, hebdomadaire ou mensuelle n'est inventée."
  - rule_id: FR_EFACT_SANCTIONS_A_VERIFIER_2026
    juridiction: FR
    categorie: sanctions
    intitule: Régime complet de sanctions
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Obligations utilisateurs et plateformes."
    date_debut: 2026-09-10
    date_fin: null
    statut: needs_review
    source_ids: [SRC_FR_EFACT_BERCY_REFORME_2026]
    date_verification: 2026-09-10
    notes: "La tolérance administrative de fin 2026 n'est pas une suppression du régime légal."
~~~

## 19. Contradictions et journal

| Date | Sources | Sujet | Résultat | Statut |
| --- | --- | --- | --- | --- |
| 2026-09-10 | DGFiP, Bercy | Réception | Obligatoire depuis 2026-09-01 | verified |
| 2026-09-10 | DGFiP, annexe II | Émission micro | Échéance 2027-09-01 | scheduled |
| 2026-09-10 | DGFiP, CGI 290 | E-reporting micro | Même calendrier général | scheduled |
| 2026-09-10 | DGFiP plateformes | Plateforme agréée | Terme canonique, solution compatible distincte | verified |
| 2026-09-10 | Article 49 ord. 2025-1247 modifié, CGI 289 bis, 289 E, 290 | Recodification | Recodification générale reportée au 2027-01-01 ; CGI actuels conservés au 2026-09-10 ; correspondances CGI/CIBS futures non inventées | needs_review |

## 20. Utilisation par les sous-skills

Cette fiche peut déterminer obligation_actuelle, obligation_future, hors_champ ou needs_review selon date, assujettissement, taille, client, localisation et opération. Une donnée nécessaire inconnue bloque la conclusion concernée.

## 21. Statut V1

La V1 contient **9 règles verified**, **2 règles scheduled** et **3 règles needs_review**. La réception est actuelle depuis le 2026-09-01 ; l'émission et le e-reporting micro restent futurs au 2027-09-01. La franchise est incluse dans le dispositif ; « plateforme agréée » est le terme canonique ; un PDF envoyé par email est distinct de la facture électronique réglementée. Aucun moteur automatique n'est implémenté.
