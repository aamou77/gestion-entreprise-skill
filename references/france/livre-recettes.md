# Livre des recettes et registre des achats — Référentiel France V1 (2026)

## 1. Statut

Vérification effectuée le **2026-09-09** pour la France, selon la méthode de [sources.md](./sources.md). Cette fiche est un référentiel de règles et de limites : elle ne constitue ni un logiciel, ni un avis pour une situation individuelle. Les bornes sont inclusives ; `date_fin: null` signifie qu'aucune fin n'était connue lors du contrôle.

Le périmètre distingue obligatoirement `micro_BIC` et `micro_BNC`. Une catégorie fiscale inconnue bloque la sélection des mentions propres à l'une de ces branches. Les synthèses sont reformulées ; aucun contenu tiers n'est reproduit.

## 2. Périmètre

La V1 couvre le livre ou document de recettes, le registre des achats lorsqu'il est exigé, les pièces justificatives, les supports et la conservation. Elle exclut la facturation complète, la TVA détaillée, la facturation électronique, les logiciels de caisse, la comptabilité au réel, le bilan, le compte de résultat, l'inventaire et les journaux de comptabilité complète.

Une recette professionnelle effectivement perçue doit recevoir une trace selon la branche applicable. Un devis, une proposition commerciale, une facture non réglée ou une opportunité CRM ne sont pas, par eux-mêmes, une recette perçue.

## 3. Sources

```yaml
sources:
  - source_id: SRC_FR_LIVRE_CGI_50_0_2026
    organisme: Légifrance
    titre: Article 50-0 du Code général des impôts
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054373853
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000054373853
    date_debut_version: 2026-07-01
    date_fin_version: null
    date_consultation: 2026-09-09
    juridiction: FR
    notes: "Paragraphe 5 : livre-journal quotidien, recettes professionnelles et justificatifs ; registre annuel des achats pour le commerce principal précisément visé. Version applicable au contrôle."
  - source_id: SRC_FR_LIVRE_CCOM_L123_28
    organisme: Légifrance
    titre: Article L123-28 du Code de commerce
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019289307
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000019289307
    date_debut_version: 2008-08-06
    date_fin_version: null
    date_consultation: 2026-09-09
    juridiction: FR
    notes: "Montant et origine des recettes en ordre chronologique ; registre annuel des achats dans le champ précis ; renvoi au décret pour les conditions de tenue."
  - source_id: SRC_FR_LIVRE_CCOM_D123_205_1
    organisme: Légifrance
    titre: Article D123-205-1 du Code de commerce
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000039371651
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000039371651
    date_debut_version: 2019-11-04
    date_fin_version: null
    date_consultation: 2026-09-09
    juridiction: FR
    notes: "Espèces / autres règlements, références justificatives, contenu du registre et équivalence possible de documents électroniques identifiés et datés avec garantie de preuve."
  - source_id: SRC_FR_LIVRE_CGI_102_TER_2026
    organisme: Légifrance
    titre: Article 102 ter du Code général des impôts
    url: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006302641
    type_source: primaire_texte_normatif
    identifiant_version: LEGIARTI000006302641
    date_debut_version: 2026-07-01
    date_fin_version: null
    date_consultation: 2026-09-09
    juridiction: FR
    notes: "Paragraphe 4 lu sur la version affichée en vigueur depuis le 01/07/2026 : détail journalier des recettes ; identité déclarée par le client, montant, date et forme du versement des honoraires."
  - source_id: SRC_FR_LIVRE_BERCY_2026
    organisme: Ministère de l'Économie — Bercy infos Entreprises
    titre: "Micro-entrepreneur (auto-entrepreneur) : quelles sont vos obligations ?"
    url: https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/micro-entrepreneur-auto-entrepreneur-quelles-sont-vos-obligations
    type_source: secondaire_officielle
    date_publication: 2026-01-14
    date_consultation: 2026-09-09
    juridiction: FR
    notes: "Synthèse : recette encaissée, chronologie, mode de règlement, justificatifs et conservation. Ne prévaut pas sur les textes normatifs lorsque son champ paraît plus large."
  - source_id: SRC_FR_LIVRE_SERVICE_PUBLIC_CONSERVATION
    organisme: Direction de l'information légale et administrative — Service Public Entreprendre
    titre: Quels sont les délais de conservation des documents pour les entreprises ?
    url: https://entreprendre.service-public.fr/vosdroits/F10029
    type_source: secondaire_officielle
    date_mise_a_jour: 2024-07-01
    date_consultation: 2026-09-09
    juridiction: FR
    notes: "Tableau des pièces comptables : livres et registres comptables, ainsi que pièces justificatives, conservés 10 ans à partir de la clôture de l'exercice."
```

## 4. Routage BIC / BNC

```text
micro_BIC ≠ micro_BNC
categorie_fiscale inconnue → bloquer les champs spécifiques
```

Le moteur doit recevoir `categorie_fiscale` avant de conclure sur les mentions réglementaires. Une activité mixte peut conserver une catégorie opérationnelle par recette si elle est connue ; une recette ambiguë ne doit pas être affectée automatiquement à l'activité principale.

## 5. Livre des recettes BIC

```yaml
rules:
  - rule_id: FR_LIVRE_BIC_JOURNAL_RECETTES_2026
    juridiction: FR
    categorie: micro_BIC
    intitule: Livre-journal quotidien des recettes professionnelles
    type: textuelle
    valeur: "Livre-journal servi au jour le jour, détaillant les recettes professionnelles et présenté sur demande de l'administration."
    unite: null
    champ_application: "Entreprises relevant de l'article 50-0 CGI qui n'ont pas opté pour un régime réel."
    date_debut: 2026-07-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CGI_50_0_2026]
    date_verification: 2026-09-09
    notes: "Ne déduit aucune fréquence différente. La facture non réglée n'est pas assimilée à une recette perçue."
  - rule_id: FR_LIVRE_BIC_MONTANT_ORIGINE_CHRONO_2026
    juridiction: FR
    categorie: micro_BIC
    intitule: Montant, origine et ordre chronologique
    type: textuelle
    valeur: "Mention chronologique du montant et de l'origine des recettes perçues au titre de l'activité professionnelle."
    unite: null
    champ_application: "Personnes physiques bénéficiant du régime défini à l'article 50-0 CGI."
    date_debut: 2008-08-06
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CCOM_L123_28]
    date_verification: 2026-09-09
    notes: "Le texte n'assimile pas l'origine à un nom, une adresse, un SIREN ou un autre identifiant client déterminé."
  - rule_id: FR_LIVRE_BIC_REGLEMENT_JUSTIFICATIF_2026
    juridiction: FR
    categorie: micro_BIC
    intitule: Distinction des règlements et référence justificative
    type: textuelle
    valeur: "Distinguer les règlements en espèces des autres règlements et indiquer les références des pièces justificatives."
    unite: null
    champ_application: "Livre prévu par l'article L123-28 du Code de commerce."
    date_debut: 2019-11-04
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CCOM_D123_205_1]
    date_verification: 2026-09-09
    notes: "Carte, chèque, virement et autre peuvent être des sous-catégories techniques ; seule la séparation espèces / autres est établie ici. Aucun format de référence n'est imposé."
```

## 6. Livre des recettes BNC

```yaml
rules:
  - rule_id: FR_LIVRE_BNC_DETAIL_JOURNALIER_2026
    juridiction: FR
    categorie: micro_BNC
    intitule: Document de détail journalier des recettes
    type: textuelle
    valeur: "Document donnant le détail journalier des recettes professionnelles, à présenter sur demande du service des impôts."
    unite: null
    champ_application: "Contribuables visés au paragraphe 1 de l'article 102 ter CGI."
    date_debut: 2026-07-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CGI_102_TER_2026]
    date_verification: 2026-09-09
    notes: "Fondement BNC autonome : ne pas utiliser le schéma BIC comme preuve juridique de cette obligation."
  - rule_id: FR_LIVRE_BNC_CHAMPS_SPECIFIQUES_2026
    juridiction: FR
    categorie: micro_BNC
    intitule: Champs BNC expressément prévus
    type: textuelle
    valeur: "identite_declaree_par_client ; montant ; date ; forme_versement_honoraires"
    unite: null
    champ_application: "Document de recettes tenu par les contribuables visés au paragraphe 1 de l'article 102 ter CGI."
    date_debut: 2026-07-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CGI_102_TER_2026]
    date_verification: 2026-09-09
    notes: "La notion fidèle est « identité déclarée par le client ». Adresse, email, téléphone, SIREN et nom complet normalisé ne sont pas ajoutés comme exigences de ce texte."
```

`date_facture`, `date_encaissement` et `date_enregistrement` sont des données distinctes. La source Bercy emploie la notion de recette encaissée ; une facture émise ne prouve donc pas, seule, l'encaissement. Cette articulation est compatible avec [cotisations-sociales.md](./cotisations-sociales.md) et le contrat fonctionnel `skills/livre-recettes/SKILL.md`.

## 7. Registre des achats

```yaml
rules:
  - rule_id: FR_REGISTRE_ACHATS_CHAMP_BIC_2026
    juridiction: FR
    categorie: micro_BIC
    intitule: Obligation limitée de registre annuel des achats
    type: textuelle
    valeur: "Registre récapitulé par année présentant le détail des achats."
    unite: null
    champ_application: "Commerce principal consistant à vendre des marchandises, objets, fournitures ou denrées à emporter ou à consommer sur place, ou à fournir le logement ; dans le champ des articles 50-0 CGI et L123-28 Code de commerce."
    date_debut: 2026-07-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CGI_50_0_2026, SRC_FR_LIVRE_CCOM_L123_28]
    date_verification: 2026-09-09
    notes: "Ne s'étend pas à toutes les prestations de services ni universellement aux micro-BNC."
  - rule_id: FR_REGISTRE_ACHATS_CONTENU_2026
    juridiction: FR
    categorie: micro_BIC
    intitule: Contenu minimal du registre des achats
    type: textuelle
    valeur: "Détail chronologique des achats, distinction espèces / autres règlements et références des pièces justificatives ; récapitulation annuelle."
    unite: null
    champ_application: "Registre requis dans le champ de FR_REGISTRE_ACHATS_CHAMP_BIC_2026."
    date_debut: 2019-11-04
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CCOM_D123_205_1, SRC_FR_LIVRE_CCOM_L123_28, SRC_FR_LIVRE_CGI_50_0_2026]
    date_verification: 2026-09-09
    notes: "Fournisseur, catégorie comptable, TVA déductible et compte comptable ne sont pas imposés ici."
```

## 8. Supports papier / électronique

```yaml
rules:
  - rule_id: FR_LIVRE_SUPPORT_ELECTRONIQUE_2026
    juridiction: FR
    categorie: micro_BIC
    intitule: Équivalence d'un document électronique
    type: textuelle
    valeur: "Un document électronique peut tenir lieu du livre ou du registre s'il est identifié et daté dès son établissement par des moyens offrant toute garantie de preuve."
    unite: null
    champ_application: "Livre et registre mentionnés à l'article L123-28 du Code de commerce."
    date_debut: 2019-11-04
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CCOM_D123_205_1]
    date_verification: 2026-09-09
    notes: "Le texte permet l'électronique ; il n'impose ni blockchain, ni signature qualifiée, ni hash, ni base append-only, ni logiciel certifié. Le support papier n'est pas écarté par cette faculté."
```

## 9. Pièces justificatives

```yaml
rules:
  - rule_id: FR_LIVRE_BIC_PIECES_JUSTIFICATIVES_2026
    juridiction: FR
    categorie: micro_BIC
    intitule: Appui des recettes par des pièces justificatives
    type: textuelle
    valeur: "Le livre-journal est appuyé des factures et de toutes autres pièces justificatives."
    unite: null
    champ_application: "Entreprises de l'article 50-0 CGI sans option pour un régime réel."
    date_debut: 2026-07-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_CGI_50_0_2026]
    date_verification: 2026-09-09
    notes: "Une facture peut être une pièce justificative ; elle ne remplace pas automatiquement l'enregistrement d'une recette encaissée."
```

## 10. Corrections / traçabilité

La conservation de `ancienne_valeur`, `nouvelle_valeur`, `motif`, `date_correction` et `origine_correction` est une bonne pratique de traçabilité et une exigence fonctionnelle interne. Elle n'est pas qualifiée ici d'obligation légale. Aucun texte consulté n'établit, dans ce périmètre, une procédure détaillée de correction, une inaltérabilité générale, une numérotation séquentielle ou une interdiction générale de suppression.

## 11. Conservation

```yaml
rules:
  - rule_id: FR_LIVRE_CONSERVATION_COMPTABLE_2026
    juridiction: FR
    categorie: micro_BIC_micro_BNC
    intitule: Conservation des livres, registres et pièces justificatives
    type: textuelle
    valeur: "10 ans à partir de la clôture de l'exercice."
    unite: ans
    champ_application: "Livres et registres comptables, ainsi que pièces justificatives, dans le tableau des pièces comptables de Service Public Entreprendre."
    date_debut: 2024-07-01
    date_fin: null
    statut: verified
    source_ids: [SRC_FR_LIVRE_SERVICE_PUBLIC_CONSERVATION]
    date_verification: 2026-09-09
    notes: "Ne pas simplifier en « 10 ans après la facture ». Le délai fiscal de 6 ans, présenté par la même page pour les droits de contrôle, est de nature et de point de départ distincts."
```

## 12. Frontières facturation / TVA / e-facturation

```text
livre_recettes ≠ facture
livre_recettes ≠ registre_TVA
livre_recettes_electronique ≠ facture_electronique
```

Le livre retrace une recette ; la facture relève de règles distinctes et peut seulement servir de justificatif. La TVA relève de [tva.md](./tva.md). Les règles de facture et de facturation électronique ne sont pas importées ; voir, lorsqu'elles seront documentées, [facturation.md](./facturation.md) et [facturation-electronique.md](./facturation-electronique.md).

## 13. Champs réglementaires et champs techniques

| Branche | Champs réglementaires vérifiés | Champs internes possibles, non présentés comme obligations |
| --- | --- | --- |
| BIC | `date_recette`, `montant`, `origine`, `mode_reglement_minimal`, `reference_piece_justificative` | `identifiant`, `date_enregistrement`, `categorie`, `source`, `statut`, `notes`, `reference_facture`, `client_id` |
| BNC | `date`, `montant`, `identite_declaree_client`, `forme_versement` | mêmes champs techniques, à documenter par le produit |

Les catégories détaillées de paiement, les totaux par période, catégorie, client ou mode, et la gestion de devise sont des fonctions de pilotage. Elles ne remplacent jamais les écritures détaillées. Pour une devise non EUR, conserver la devise d'origine et bloquer toute règle de conversion fiscale tant qu'une source applicable n'est pas vérifiée.

## 14. Contrôles internes

La détection de doublons, la revue humaine des doublons potentiels, l'absence d'effacement automatique et le lien entre opération initiale et opération corrective sont des contrôles internes. Ils ne fondent aucune règle juridique de suppression ou de ligne négative. Les totaux doivent conserver leur période, filtres, devise, exclusions et entrées ambiguës.

## 15. Exclusions / needs_review

```yaml
rules:
  - rule_id: FR_LIVRE_CORRECTION_A_VERIFIER_2026
    juridiction: FR
    categorie: micro_BIC_micro_BNC
    intitule: Procédure de correction ou de modification
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Corrections du livre ou document de recettes et du registre des achats."
    date_debut: 2026-09-09
    date_fin: null
    statut: needs_review
    source_ids: [SRC_FR_LIVRE_CGI_50_0_2026, SRC_FR_LIVRE_CCOM_D123_205_1, SRC_FR_LIVRE_CGI_102_TER_2026]
    date_verification: 2026-09-09
    notes: "Aucune procédure détaillée de correction n'a été trouvée dans les sources primaires de cette V1."
  - rule_id: FR_LIVRE_AGREGATION_JOURNALIERE_A_VERIFIER_2026
    juridiction: FR
    categorie: micro_BIC_micro_BNC
    intitule: Agrégation de petites recettes journalières
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Toute exception à l'inscription détaillée des recettes."
    date_debut: 2026-09-09
    date_fin: null
    statut: needs_review
    source_ids: []
    date_verification: 2026-09-09
    notes: "Aucune exception officielle applicable n'a été vérifiée ; V1 fonctionne avec une inscription individuelle."
  - rule_id: FR_LIVRE_REMBOURSEMENT_ANNULATION_A_VERIFIER_2026
    juridiction: FR
    categorie: micro_BIC_micro_BNC
    intitule: Traitement réglementaire des remboursements et annulations
    type: textuelle
    valeur: null
    unite: null
    champ_application: "Recette annulée ou remboursée."
    date_debut: 2026-09-09
    date_fin: null
    statut: needs_review
    source_ids: []
    date_verification: 2026-09-09
    notes: "Aucune méthode universelle n'est validée ; conserver fonctionnellement l'opération initiale, l'opération corrective et leur lien."
```

## 16. Contradictions et journal

La page Bercy associe une formulation sur la franchise en base de TVA à la tenue de certains registres. Le champ normatif du registre des achats reste celui, plus précis, des articles 50-0 CGI et L123-28 du Code de commerce ; la synthèse secondaire ne l'élargit pas. La page Service Public présente aussi un délai fiscal de 6 ans, distinct du délai comptable de 10 ans retenu ici ; aucune ancienne documentation non recontrôlée n'est utilisée pour l'écarter.

| Date | Sources | Règle vérifiée | Contradiction / limite | Statut |
| --- | --- | --- | --- | --- |
| 2026-09-09 | 50-0 CGI, L123-28 C. com. | Livre BIC, contenu et registre limité | BIC distinct du BNC | verified |
| 2026-09-09 | 102 ter CGI | Livre BNC et champs spécifiques | Ne pas importer les champs BIC | verified |
| 2026-09-09 | D123-205-1 C. com. | Espèces / autres, justificatifs, électronique | Aucun procédé technique imposé | verified |
| 2026-09-09 | Service Public, Bercy | Conservation de 10 ans | Délai fiscal de 6 ans distinct | verified |
| 2026-09-09 | Sources primaires V1 | correction, agrégation, remboursement | Procédure détaillée non établie | needs_review |

## 17. Utilisation par les sous-skills

Cette fiche peut alimenter `skills/livre-recettes`, puis indirectement la trésorerie, la synthèse de gestion et le suivi de seuils. Aucun sous-skill ne doit reconstruire arbitrairement les recettes à partir du CRM :

```text
recette_enregistree ≠ facture_emise ≠ devis ≠ encaissement_bancaire_non_qualifie
```

## 18. Statut V1

La V1 contient **10 règles `verified`** et **3 règles `needs_review`**. Elle sépare BIC et BNC, limite le registre des achats à son champ, autorise le support électronique sous les conditions vérifiées et retient la conservation de 10 ans à compter de la clôture de l'exercice. Les corrections ne sont pas présentées comme une obligation tant qu'elles restent non sourcées. Aucun moteur automatique n'est implémenté.
