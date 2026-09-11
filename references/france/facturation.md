# Facturation — Référentiel France V1 (2026)

## 1. Statut

Vérification au **2026-09-10**, selon [sources.md](./sources.md) et les conventions de [micro-entreprise.md](./micro-entreprise.md), [tva.md](./tva.md), [cotisations-sociales.md](./cotisations-sociales.md) et [livre-recettes.md](./livre-recettes.md). La V1 établit des règles générales de facturation utiles à une micro-entreprise ; elle ne qualifie pas une opération particulière. Chaque règle est limitée par son client, son régime TVA et sa période. La réforme électronique reste hors moteur.

## 2. Périmètre

Cette fiche couvre la facture classique, les branches B2B/B2C, les mentions, TVA ou franchise, le règlement B2B, les acomptes, rectifications limitées et conservation. Elle exclut e-reporting, plateformes, formats structurés, opérations internationales complexes, autoliquidation et régimes particuliers.

## 3. Sources

~~~yaml
sources:
  - source_id: SRC_FR_FACT_CCOM_L441_9_20260901
    organisme: Légifrance
    titre: Article L441-9 du Code de commerce
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038414397
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000038414397
    date_debut_version: 2026-09-01
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Version issue de l'ordonnance 2025-1247, entrée en vigueur le 01/09/2026 : B2B, parties, lignes, règlement, escompte, pénalités, indemnité et bon de commande."
  - source_id: SRC_FR_FACT_CCOM_L441_10_20190426
    organisme: Légifrance
    titre: Article L441-10 du Code de commerce
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038414392
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000038414392
    date_debut_version: 2019-04-26
    date_fin_version: 2027-01-01
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Version applicable au 10/09/2026 malgré une abrogation différée : délais B2B et pénalités."
  - source_id: SRC_FR_FACT_CCOM_D441_5_2021
    organisme: Légifrance
    titre: Article D441-5 du Code de commerce
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043197457
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000043197457
    date_debut_version: 2021-02-27
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Montant de l'indemnité forfaitaire de L441-10."
  - source_id: SRC_FR_FACT_CGI_289_2026
    organisme: Légifrance
    titre: Article 289 du Code général des impôts
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048827413
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000048827413
    date_debut_version: 2023-12-31
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Opérations B2B et personne morale non assujettie, acomptes, émission, conservation et document rectificatif."
  - source_id: SRC_FR_FACT_CGI_ANN2_242_NONIES_A_2025
    organisme: Légifrance
    titre: Article 242 nonies A de l'annexe II au CGI
    url: https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000050811276
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000050811276
    date_debut_version: 2025-01-01
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Mentions fiscales. La rédaction de réforme est reportée au 01/09/2027 pour les microentreprises dans son champ électronique."
  - source_id: SRC_FR_FACT_CGI_293_E_2025
    organisme: Légifrance
    titre: Article 293 E du Code général des impôts
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048826675
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000048826675
    date_debut_version: 2025-01-01
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Franchise : absence de TVA sur facture et mention de base légale."
  - source_id: SRC_FR_FACT_BERCY_2026
    organisme: Ministère de l'Économie — Bercy infos Entreprises
    titre: "Mentions obligatoires d'une facture : tout savoir"
    url: https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir
    type_source: secondaire_officielle
    date_publication: 2026-02-25
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Recoupement des cas B2C, mentions et calendrier ; ne prévaut pas sur les textes."
  - source_id: SRC_FR_FACT_SERVICE_PUBLIC_CONSERVATION
    organisme: Direction de l'information légale et administrative — Service Public Entreprendre
    titre: Quels sont les délais de conservation des documents pour les entreprises ?
    url: https://entreprendre.service-public.fr/vosdroits/F10029
    type_source: secondaire_officielle
    date_mise_a_jour: 2024-07-01
    date_consultation: 2026-09-10
    juridiction: FR
    notes: "Factures clients et fournisseurs : pièces justificatives, 10 ans à partir de la clôture de l'exercice."
~~~

## 4. Routage B2B / B2C

~~~text
type_client: professionnel | particulier
type_client inconnu → bloquer les règles spécifiques
micro_entreprise ≠ franchise_TVA
~~~

Une facture émise, une facture payée et une recette encaissée sont des événements distincts.

## 5. Obligation de facturer

~~~yaml
rules:
  - rule_id: FR_FACT_B2B_OBLIGATION_2026
    juridiction: FR
    categorie: B2B
    intitule: Facturation des achats et prestations professionnels
    type: textuelle
    valeur: "Tout achat de produits ou toute prestation de service pour une activité professionnelle fait l'objet d'une facturation."
    unite: null
    champ_application: "Vendeur et acheteur dans le cadre d'une activité professionnelle ; L441-9."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_L441_9_20260901]
    date_verification: 2026-09-10
    notes: "Le vendeur délivre la facture dès la livraison ou la prestation ; l'acheteur la réclame."
  - rule_id: FR_FACT_OBLIGATION_FISCALE_ASSUJETTI_2026
    juridiction: FR
    categorie: TVA_facturation
    intitule: Cas fiscaux d'émission
    type: textuelle
    valeur: "L'assujetti s'assure qu'une facture est émise pour les opérations listées, notamment envers un autre assujetti, une personne morale non assujettie et certains acomptes."
    unite: null
    champ_application: "CGI 289 I-1 ; exceptions et international hors V1."
    date_debut: 2023-12-31
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CGI_289_2026]
    date_verification: 2026-09-10
    notes: "Ne rend pas toute transaction B2C universellement facturable."
  - rule_id: FR_FACT_B2C_CAS_CONFIRMES_2026
    juridiction: FR
    categorie: B2C
    intitule: Cas B2C confirmés
    type: textuelle
    valeur: "Facture à la demande du client, pour les ventes à distance ou certaines livraisons intracommunautaires exonérées."
    unite: null
    champ_application: "Client particulier ; cas listés par Bercy."
    date_debut: 2026-02-25
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_BERCY_2026]
    date_verification: 2026-09-10
    notes: "Fondement secondaire, volontairement borné."
~~~

## 6. Identification et numérotation

~~~yaml
rules:
  - rule_id: FR_FACT_DATE_NUMERO_2026
    juridiction: FR
    categorie: facture_classique
    intitule: Date d'émission et numéro unique
    type: textuelle
    valeur: "Date d'émission ; numéro unique basé sur une séquence chronologique et continue."
    unite: null
    champ_application: "Factures soumises aux mentions de l'article 242 nonies A."
    date_debut: 2025-01-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CGI_ANN2_242_NONIES_A_2025]
    date_verification: 2026-09-10
    notes: "Séries distinctes possibles si justifiées ; aucun format tel que 2026-0001 n'est imposé."
  - rule_id: FR_FACT_PARTIES_ADRESSES_B2B_2026
    juridiction: FR
    categorie: B2B
    intitule: Parties et adresses
    type: textuelle
    valeur: "Nom des parties, adresse et adresse de facturation lorsqu'elle est différente."
    unite: null
    champ_application: "Facture professionnelle L441-9."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_L441_9_20260901]
    date_verification: 2026-09-10
    notes: "SIREN client de la réforme non ajouté comme mention classique immédiate."
  - rule_id: FR_FACT_BON_COMMANDE_2026
    juridiction: FR
    categorie: B2B
    intitule: Numéro de bon de commande
    type: textuelle
    valeur: "Mentionner le numéro du bon de commande lorsqu'il a été préalablement établi par l'acheteur."
    unite: null
    champ_application: "Facture professionnelle et bon existant."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_L441_9_20260901]
    date_verification: 2026-09-10
    notes: "Ne crée pas un bon de commande inexistant."
~~~

## 7. Dates

~~~yaml
rules:
  - rule_id: FR_FACT_DATE_OPERATION_ACOMPTE_2026
    juridiction: FR
    categorie: TVA_facturation
    intitule: Date de l'opération distincte
    type: textuelle
    valeur: "Date de livraison ou d'achèvement de la prestation, ou date de versement de l'acompte, lorsqu'elle est différente de la date d'émission."
    unite: null
    champ_application: "Article 242 nonies A, I-10."
    date_debut: 2025-01-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CGI_ANN2_242_NONIES_A_2025]
    date_verification: 2026-09-10
    notes: "date_emission ≠ date_vente ≠ date_realisation_prestation ≠ date_acompte ≠ date_paiement."
  - rule_id: FR_FACT_EMISSION_ET_ACOMPTE_2026
    juridiction: FR
    categorie: TVA_facturation
    intitule: Émission et acompte
    type: textuelle
    valeur: "Facture émise en principe dès livraison ou prestation ; émission requise pour les acomptes dans les cas de CGI 289 I-1."
    unite: null
    champ_application: "CGI 289 I-1 c et I-3 ; TVA complexe exclue."
    date_debut: 2023-12-31
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CGI_289_2026]
    date_verification: 2026-09-10
    notes: "Distinguer facture_acompte et facture_solde si le produit les modélise."
~~~

## 8. Lignes, prix et réductions

~~~yaml
rules:
  - rule_id: FR_FACT_LIGNES_PRIX_REDUCTIONS_B2B_2026
    juridiction: FR
    categorie: B2B
    intitule: Désignation, quantité, prix et réductions
    type: textuelle
    valeur: "Quantité, dénomination précise, prix unitaire hors TVA et réduction acquise, chiffrable et directement liée à l'opération."
    unite: null
    champ_application: "Facture professionnelle L441-9."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_L441_9_20260901]
    date_verification: 2026-09-10
    notes: "Remise, rabais et ristourne ne sont pas confondus avec l'escompte."
~~~

## 9. TVA et franchise

~~~yaml
rules:
  - rule_id: FR_FACT_TVA_MENTIONS_SI_APPLICABLE_2026
    juridiction: FR
    categorie: TVA_applicable
    intitule: Totaux et TVA applicable
    type: textuelle
    valeur: "Par taux, total hors taxe et taxe correspondante distinctement ; taux légal ou exonération selon le cas."
    unite: null
    champ_application: "Article 242 nonies A, I-8 et I-11 ; taux hors fiche."
    date_debut: 2025-01-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CGI_ANN2_242_NONIES_A_2025]
    date_verification: 2026-09-10
    notes: "Le total TTC dépend de la TVA applicable. Voir tva.md."
  - rule_id: FR_FACT_FRANCHISE_TVA_293_B_2026
    juridiction: FR
    categorie: franchise_TVA
    intitule: Absence de TVA et mention de franchise
    type: textuelle
    valeur: "Ne pas faire apparaître la TVA ; mention « TVA non applicable, article 293 B du CGI » dans le cas général correspondant."
    unite: null
    champ_application: "Assujetti en franchise 293 B ou 293 B bis, statut issu de tva.md ou d'une donnée vérifiée."
    date_debut: 2025-01-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CGI_293_E_2025]
    date_verification: 2026-09-10
    notes: "293 E prévoit aussi 293 B bis ou la directive dans son champ ; micro ne signifie pas automatiquement franchise."
~~~

## 10. Paiement et échéances

~~~yaml
rules:
  - rule_id: FR_FACT_ECHEANCE_ESCOMPTE_B2B_2026
    juridiction: FR
    categorie: B2B
    intitule: Échéance et escompte
    type: textuelle
    valeur: "La facture mentionne la date de règlement et les conditions d'escompte applicables en cas de paiement anticipé."
    unite: null
    champ_application: "Facture professionnelle L441-9."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_L441_9_20260901]
    date_verification: 2026-09-10
    notes: "Aucune formule d'exemple n'est érigée en texte légal."
  - rule_id: FR_FACT_DELAIS_B2B_2026
    juridiction: FR
    categorie: B2B
    intitule: Délais de paiement
    type: textuelle
    valeur: "À défaut, au plus 30 jours après réception ou exécution ; délai convenu au plus 60 jours après émission ; 45 jours fin de mois si expressément stipulé et sans abus manifeste."
    unite: jours
    champ_application: "Sommes dues entre professionnels ; régimes spéciaux hors V1."
    date_debut: 2019-04-26
    date_fin: 2026-12-31
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_L441_10_20190426]
    date_verification: 2026-09-10
    notes: "30 jours n'est pas un délai universel. Facture périodique : plafond distinct de 45 jours après émission."
~~~

## 11. Pénalités et indemnité

~~~yaml
rules:
  - rule_id: FR_FACT_PENALITES_RETARD_B2B_2026
    juridiction: FR
    categorie: B2B
    intitule: Pénalités de retard
    type: textuelle
    valeur: "Mentionner le taux des pénalités ; elles sont exigibles le jour suivant l'échéance et sans rappel nécessaire."
    unite: null
    champ_application: "Retard B2B relevant de L441-9 et L441-10."
    date_debut: 2026-09-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_L441_9_20260901, SRC_FR_FACT_CCOM_L441_10_20190426]
    date_verification: 2026-09-10
    notes: "Aucun taux fixe : L441-10 définit une formule et un minimum."
  - rule_id: FR_FACT_INDEMNITE_RECOUVREMENT_B2B_2026
    juridiction: FR
    categorie: B2B
    intitule: Indemnité forfaitaire de recouvrement
    type: numerique
    valeur: 40
    unite: EUR
    champ_application: "Professionnel en retard de paiement dans le dispositif L441-10."
    date_debut: 2021-02-27
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CCOM_D441_5_2021, SRC_FR_FACT_CCOM_L441_10_20190426]
    date_verification: 2026-09-10
    notes: "B2B seulement ; L441-9 impose sa mention sur la facture professionnelle."
~~~

## 12. Acomptes

Les acomptes sont couverts en section 7 dans le champ limité du CGI 289. La V1 n'en traite pas les conséquences TVA détaillées.

## 13. Rectification / avoir

~~~yaml
rules:
  - rule_id: FR_FACT_RECTIFICATION_REFERENCE_2026
    juridiction: FR
    categorie: TVA_facturation
    intitule: Document rectificatif
    type: textuelle
    valeur: "Un document modifiant la facture initiale, qui la référence de façon spécifique et non équivoque, est assimilé à une facture et comporte les mentions requises."
    unite: null
    champ_application: "Facture initiale émise selon CGI 289."
    date_debut: 2023-12-31
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_CGI_289_2026]
    date_verification: 2026-09-10
    notes: "Préserver facture d'origine, correctif et lien ; procédure commerciale complète non validée."
~~~

## 14. Conservation

~~~yaml
rules:
  - rule_id: FR_FACT_CONSERVATION_2026
    juridiction: FR
    categorie: pieces_comptables
    intitule: Conservation des factures
    type: textuelle
    valeur: "10 ans à partir de la clôture de l'exercice."
    unite: ans
    champ_application: "Factures clients et fournisseurs, comme pièces justificatives comptables."
    date_debut: 2024-07-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_FACT_SERVICE_PUBLIC_CONSERVATION]
    date_verification: 2026-09-10
    notes: "Ne pas confondre avec les délais fiscaux de contrôle. Cohérent avec livre-recettes.md."
~~~

## 15. Frontière facturation électronique

~~~text
facturation_classique ≠ facturation_electronique_reglementee
~~~

Un PDF ou un envoi électronique ne vaut pas automatiquement facture électronique réglementée. Plateformes, formats et données de réforme sont renvoyés à [facturation-electronique.md](./facturation-electronique.md).

## 16. Champs conceptuels

~~~text
type_client, date_emission, numero_facture, date_operation, vendeur, client,
adresse_facturation, bon_commande_si_applicable, lignes_facture, quantite,
designation, prix_unitaire_HT, reductions, statut_TVA, total_HT,
TVA_si_applicable, total_TTC_si_applicable, date_echeance,
conditions_escompte, taux_penalites_si_B2B, indemnite_recouvrement_si_B2B, devise
~~~

Ces données se sélectionnent selon B2B/B2C, TVA/franchise, opération et période ; elles ne sont pas toutes obligatoires ensemble. Devise et langue étrangère ne créent pas de moteur de conversion dans cette V1.

## 17. Exclusions / needs_review

~~~yaml
rules:
  - rule_id: FR_FACTURATION_B2C_CAS_SPECIFIQUES_A_VERIFIER
    juridiction: FR
    categorie: B2C
    intitule: Autres cas consommateur
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Obligations consommateur hors FR_FACT_B2C_CAS_CONFIRMES_2026."
    date_debut: 2026-09-10
    date_fin: null
    statut: needs_review
    source_ids: [SRC_FR_FACT_BERCY_2026]
    date_verification: 2026-09-10
    notes: "Ne pas fusionner une éventuelle note de services au consommateur avec la facture générale."
  - rule_id: FR_FACT_AVOIR_PROCEDURE_COMPLETE_A_VERIFIER
    juridiction: FR
    categorie: facture_classique
    intitule: Procédure complète d'avoir et non-réutilisation
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Avoir, annulation commerciale et réutilisation de numéro."
    date_debut: 2026-09-10
    date_fin: null
    statut: needs_review
    source_ids: [SRC_FR_FACT_CGI_289_2026]
    date_verification: 2026-09-10
    notes: "Le correctif référencé est établi, pas une procédure universelle d'avoir ou de suppression."
  - rule_id: FR_FACT_MENTIONS_REFORME_MICRO_2027
    juridiction: FR
    categorie: micro_entreprise_facturation_electronique
    intitule: Quatre données de réforme
    type: textuelle
    valeur: "SIREN client ; adresse de livraison différente ; catégorie de l'opération ; option TVA sur les débits."
    unite: null
    champ_application: "Microentreprises dans le champ électronique concerné."
    date_debut: 2027-09-01
    date_fin: null
    statut: scheduled
    source_ids: [SRC_FR_FACT_CGI_ANN2_242_NONIES_A_2025, SRC_FR_FACT_BERCY_2026]
    date_verification: 2026-09-10
    notes: "Hors moteur et non applicable comme mention classique immédiate en septembre 2026."
~~~

## 18. Contradictions et journal

Depuis le 01/09/2026, L441-9 renvoie au CIBS pour certains points, sans autoriser l'anticipation de références futures. L'article 242 nonies A contient quatre nouvelles données, mais reporte leur effet pour les microentreprises du champ concerné au 01/09/2027. Les délais B2B distinguent défaut, convention et plafond ; ils ne se reportent pas au B2C.

| Date | Sources | Règle examinée | Résultat / contradiction | Statut |
| --- | --- | --- | --- | --- |
| 2026-09-10 | L441-9, CGI 289 | Obligation B2B | Obligation professionnelle confirmée | verified |
| 2026-09-10 | Bercy | B2C | Trois cas bornés, reste ouvert | verified / needs_review |
| 2026-09-10 | 242 nonies A | Mentions et numérotation | Réforme micro reportée au 2027-09-01 | verified / scheduled |
| 2026-09-10 | L441-10, D441-5 | Paiement, pénalités, indemnité | B2B ; indemnité 40 EUR | verified |
| 2026-09-10 | 293 E, Service Public | Franchise et conservation | TVA non applicable ; 10 ans | verified |
| 2026-09-10 | CGI 289 | Avoir | Correctif référencé, procédure ouverte | verified / needs_review |

## 19. Utilisation par les sous-skills

Cette fiche peut alimenter gestion commerciale, livre des recettes, trésorerie et synthèse de gestion, à condition de conserver :

~~~text
facture_emise ≠ facture_payee ≠ recette_encaissee
date_emission ≠ date_echeance ≠ date_encaissement
~~~

Une facture impayée ne devient jamais automatiquement une recette réelle.

## 20. Statut V1

La V1 contient **17 règles verified**, **2 règles needs_review** et **1 règle scheduled**. B2B et B2C, ainsi que TVA applicable et franchise, sont séparés. Les pénalités et l'indemnité de 40 EUR sont limitées au B2B. La réforme électronique est hors moteur, et aucun moteur automatique ni modèle de facture n'est implémenté.
