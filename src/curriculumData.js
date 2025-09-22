// Molecular Genetic Pathology Curriculum Data
export const curriculumTopics = [
    {
        id: 1,
        topic: "Normal Structure and Function",
        level: "Core",
        duration: "4 weeks",
        subtopics: [
            "Chromosomes", "Genes", "Exons, Introns, Non-Coding DNA",
            "Repetitive Elements (e.g., STRs, Microsatellite)", "mRNA and tRNA",
            "miRNA and lncRNA", "Transcription, Translation, and Post-Translational Modification",
            "Mitosis", "Meiosis", "Gene Nomenclature", "Protein Nomenclature", "Variant Nomenclature"
        ]
    },
    {
        id: 2,
        topic: "Molecular Genetic Principles",
        level: "Core",
        duration: "6 weeks",
        subtopics: [
            "Ploidy", "Copy Number Variants (CNV)", "Deletions, Duplications, Inversions",
            "Single Nucleotide Polymorphisms (SNPs)", "Methylation, Epigenetics", "Trinucleotide Repeats",
            "Multifactorial Events", "Mismatch Repair", "Point Mutations", "Mosaicism",
            "Mendelian Inheritance", "Non-Mendelian Inheritance", "Oncogenes (Inherited)",
            "Tumor Suppressor Genes (Inherited)", "Risk Calculations", "Hardy Weinberg Principle",
            "Oncogenes (Somatic)", "Tumor Suppressor Genes (Somatic)", "Loss of Heterozygosity (LOH)",
            "Microsatellite Instability (MSI)", "Clonality", "Genomic Instability"
        ]
    },
    {
        id: 3,
        topic: "Techniques and Methods",
        level: "Core",
        duration: "8 weeks",
        subtopics: [
            "Cytogenetics", "PCR, RT-PCR, and other NAAT", "FISH", "Nucleic Acid Isolation & Quantitation",
            "Restriction Enzyme Digestion", "Fragment Analysis", "Quantitative PCR and RT-PCR",
            "Nucleic Acid Sequencing", "Next Generation Sequencing", "Constitutional Arrays",
            "Somatic Arrays", "Melt Curve Analysis", "Tumor Mutational Burden"
        ]
    },
    {
        id: 4,
        topic: "Assay Performance and Validation",
        level: "Core",
        duration: "4 weeks",
        subtopics: [
            "Proficiency Testing", "Validation versus Verification", "Preanalytical Considerations",
            "Stability", "Specimen Selection", "Specimen Collection", "Anticoagulant", "Fixation",
            "Results, Interpretation, & Follow-up Testing", "Variant Classification", "Reporting"
        ]
    },
    {
        id: 5,
        topic: "Quality",
        level: "Core",
        duration: "3 weeks",
        subtopics: [
            "Quality Assurance", "Quality Control", "Internal Controls", "Quantitative Controls"
        ]
    },
    {
        id: 6,
        topic: "Ethical, Legal, and Regulatory Issues",
        level: "Advanced Resident",
        duration: "4 weeks",
        subtopics: [
            "IRB", "Consent", "HIPAA", "GINA", "Gene Patent", "CLIA", "CAP", "CMS",
            "FDA: LDT/LDP, IUO, RUO", "CPT", "ICD", "Laboratory Utilization"
        ]
    },
    {
        id: 7,
        topic: "Indications for Testing",
        level: "Advanced Resident",
        duration: "3 weeks",
        subtopics: [
            "Presymptomatic / Predictive", "Diagnostic", "Preimplantation Genetic Diagnosis (PGD)",
            "Carrier Screening", "Newborn Screening"
        ]
    }
];

export const resources = {
    books: [
        {
            id: 1,
            title: "Molecular Pathology: The Molecular Basis of Human Disease",
            author: "William B. Coleman, Gregory J. Tsongalis",
            publisher: "Academic Press",
            edition: "3rd Edition",
            isbn: "978-0123864567",
            topics: [1, 2, 3, 4]
        },
        {
            id: 2,
            title: "Diagnostic Molecular Pathology: A Guide to Applied Molecular Testing",
            author: "William B. Coleman, Gregory J. Tsongalis",
            publisher: "Academic Press",
            edition: "1st Edition",
            isbn: "978-0123945853",
            topics: [3, 4, 5]
        },
        {
            id: 3,
            title: "Clinical Genomics: Practical Applications in Adult Patient Care",
            author: "Michael F. Murray, Mark W. Babyatsky",
            publisher: "McGraw-Hill Education",
            edition: "1st Edition",
            isbn: "978-0071622443",
            topics: [1, 2, 7]
        }
    ],
    journals: [
        {
            id: 1,
            title: "The Journal of Molecular Diagnostics",
            publisher: "American Society for Investigative Pathology",
            impactFactor: "4.1",
            url: "https://www.jmdjournal.org/",
            topics: [1, 2, 3, 4, 5, 6, 7]
        },
        {
            id: 2,
            title: "Genetics in Medicine",
            publisher: "American College of Medical Genetics and Genomics",
            impactFactor: "9.9",
            url: "https://www.nature.com/gim/",
            topics: [1, 2, 6, 7]
        },
        {
            id: 3,
            title: "Modern Pathology",
            publisher: "Nature Publishing Group",
            impactFactor: "6.3",
            url: "https://www.nature.com/modpathol/",
            topics: [1, 2, 3, 4, 5]
        }
    ],
    links: [
        {
            id: 1,
            title: "NCBI Gene Database",
            url: "https://www.ncbi.nlm.nih.gov/gene/",
            description: "Comprehensive gene information database",
            topics: [1, 2]
        },
        {
            id: 2,
            title: "ClinVar Database",
            url: "https://www.ncbi.nlm.nih.gov/clinvar/",
            description: "Public archive of human genetic variants",
            topics: [2, 4, 7]
        },
        {
            id: 3,
            title: "ACMG Guidelines",
            url: "https://www.acmg.net/",
            description: "American College of Medical Genetics guidelines",
            topics: [6, 7]
        }
    ]
};

export const boardQuestions = [
    {
        id: 1,
        question: "Which of the following best describes the Hardy-Weinberg principle?",
        options: [
            "A) Allele frequencies remain constant in a population under certain conditions",
            "B) Dominant alleles always increase in frequency over time",
            "C) Recessive alleles are always harmful to the organism",
            "D) Mutations always lead to evolution"
        ],
        correctAnswer: 0,
        explanation: "The Hardy-Weinberg principle states that allele frequencies in a population remain constant from generation to generation under certain conditions (no mutation, no migration, large population size, random mating, and no selection).",
        topic: 2,
        subtopic: "Hardy Weinberg Principle",
        level: "Core",
        difficulty: "Medium"
    },
    {
        id: 2,
        question: "What is the primary advantage of next-generation sequencing over Sanger sequencing?",
        options: [
            "A) Higher accuracy",
            "B) Lower cost per base",
            "C) Longer read lengths",
            "D) Better for single gene analysis"
        ],
        correctAnswer: 1,
        explanation: "Next-generation sequencing provides massively parallel sequencing, allowing for much lower cost per base compared to Sanger sequencing, making it feasible for whole genome or exome sequencing.",
        topic: 3,
        subtopic: "Next Generation Sequencing",
        level: "Core",
        difficulty: "Medium"
    },
    {
        id: 3,
        question: "Which regulatory body oversees laboratory-developed tests (LDTs) in the United States?",
        options: [
            "A) CLIA",
            "B) CAP",
            "C) FDA",
            "D) CMS"
        ],
        correctAnswer: 2,
        explanation: "The FDA has regulatory authority over laboratory-developed tests (LDTs), though this is currently under review and may change with new regulations.",
        topic: 6,
        subtopic: "FDA: LDT/LDP, IUO, RUO",
        level: "Advanced Resident",
        difficulty: "Hard"
    }
];

export const projects = [
    {
        id: 1,
        title: "PCR Optimization Project",
        description: "Design and optimize a PCR assay for detecting a specific genetic variant",
        duration: "2 weeks",
        topic: 3,
        subtopic: "PCR, RT-PCR, and other NAAT",
        deliverables: [
            "Protocol development",
            "Optimization results",
            "Validation data",
            "Written report"
        ],
        resources: [1, 2],
        dueDate: "2024-02-15"
    },
    {
        id: 2,
        title: "Variant Interpretation Case Study",
        description: "Analyze and interpret a complex genetic variant using ACMG guidelines",
        duration: "1 week",
        topic: 4,
        subtopic: "Variant Classification",
        deliverables: [
            "Variant analysis",
            "Classification justification",
            "Clinical significance assessment",
            "Presentation"
        ],
        resources: [1, 3],
        dueDate: "2024-02-22"
    },
    {
        id: 3,
        title: "Quality Control Assessment",
        description: "Evaluate quality control procedures for a molecular diagnostic assay",
        duration: "1 week",
        topic: 5,
        subtopic: "Quality Control",
        deliverables: [
            "QC procedure review",
            "Statistical analysis",
            "Recommendations",
            "Implementation plan"
        ],
        resources: [2],
        dueDate: "2024-03-01"
    }
];

// 2-Year Curriculum Timeline (24 months)
export const twoYearCurriculum = {
    year1: [
        {
            month: 1,
            name: "January",
            topics: [
                {
                    id: 1,
                    topic: "Normal Structure and Function",
                    level: "Core",
                    duration: "4 weeks",
                    focus: "Chromosomes, Genes, Basic Structure",
                    subtopics: ["Chromosomes", "Genes", "Exons, Introns, Non-Coding DNA", "Repetitive Elements"]
                }
            ],
            projects: ["Basic Genetics Review Project"],
            assessments: ["Chromosome Structure Quiz"]
        },
        {
            month: 2,
            name: "February",
            topics: [
                {
                    id: 1,
                    topic: "Normal Structure and Function",
                    level: "Core",
                    duration: "4 weeks",
                    focus: "RNA and Protein Processing",
                    subtopics: ["mRNA and tRNA", "miRNA and lncRNA", "Transcription, Translation", "Post-Translational Modification"]
                }
            ],
            projects: ["RNA Processing Analysis"],
            assessments: ["Protein Synthesis Quiz"]
        },
        {
            month: 3,
            name: "March",
            topics: [
                {
                    id: 1,
                    topic: "Normal Structure and Function",
                    level: "Core",
                    duration: "4 weeks",
                    focus: "Cell Division and Nomenclature",
                    subtopics: ["Mitosis", "Meiosis", "Gene Nomenclature", "Protein Nomenclature", "Variant Nomenclature"]
                }
            ],
            projects: ["Cell Division Simulation"],
            assessments: ["Nomenclature Standards Test"]
        },
        {
            month: 4,
            name: "April",
            topics: [
                {
                    id: 2,
                    topic: "Molecular Genetic Principles",
                    level: "Core",
                    duration: "6 weeks",
                    focus: "Basic Genetic Variants",
                    subtopics: ["Ploidy", "Copy Number Variants (CNV)", "Deletions, Duplications, Inversions", "Single Nucleotide Polymorphisms (SNPs)"]
                }
            ],
            projects: ["CNV Analysis Project"],
            assessments: ["Genetic Variants Quiz"]
        },
        {
            month: 5,
            name: "May",
            topics: [
                {
                    id: 2,
                    topic: "Molecular Genetic Principles",
                    level: "Core",
                    duration: "6 weeks",
                    focus: "Epigenetics and Complex Inheritance",
                    subtopics: ["Methylation, Epigenetics", "Trinucleotide Repeats", "Multifactorial Events", "Mismatch Repair"]
                }
            ],
            projects: ["Epigenetics Research Project"],
            assessments: ["Epigenetics Assessment"]
        },
        {
            month: 6,
            name: "June",
            topics: [
                {
                    id: 2,
                    topic: "Molecular Genetic Principles",
                    level: "Core",
                    duration: "6 weeks",
                    focus: "Inheritance Patterns",
                    subtopics: ["Point Mutations", "Mosaicism", "Mendelian Inheritance", "Non-Mendelian Inheritance"]
                }
            ],
            projects: ["Pedigree Analysis Project"],
            assessments: ["Inheritance Patterns Exam"]
        },
        {
            month: 7,
            name: "July",
            topics: [
                {
                    id: 2,
                    topic: "Molecular Genetic Principles",
                    level: "Core",
                    duration: "6 weeks",
                    focus: "Cancer Genetics",
                    subtopics: ["Oncogenes (Inherited)", "Tumor Suppressor Genes (Inherited)", "Risk Calculations", "Hardy Weinberg Principle"]
                }
            ],
            projects: ["Cancer Risk Assessment"],
            assessments: ["Cancer Genetics Quiz"]
        },
        {
            month: 8,
            name: "August",
            topics: [
                {
                    id: 2,
                    topic: "Molecular Genetic Principles",
                    level: "Core",
                    duration: "6 weeks",
                    focus: "Somatic Mutations",
                    subtopics: ["Oncogenes (Somatic)", "Tumor Suppressor Genes (Somatic)", "Loss of Heterozygosity (LOH)", "Microsatellite Instability (MSI)"]
                }
            ],
            projects: ["Somatic Mutation Analysis"],
            assessments: ["Somatic Genetics Test"]
        },
        {
            month: 9,
            name: "September",
            topics: [
                {
                    id: 2,
                    topic: "Molecular Genetic Principles",
                    level: "Core",
                    duration: "6 weeks",
                    focus: "Genomic Instability",
                    subtopics: ["Clonality", "Genomic Instability"]
                },
                {
                    id: 3,
                    topic: "Techniques and Methods",
                    level: "Core",
                    duration: "8 weeks",
                    focus: "Basic Techniques",
                    subtopics: ["Cytogenetics", "PCR, RT-PCR, and other NAAT"]
                }
            ],
            projects: ["Genomic Instability Study"],
            assessments: ["Principles Comprehensive Exam"]
        },
        {
            month: 10,
            name: "October",
            topics: [
                {
                    id: 3,
                    topic: "Techniques and Methods",
                    level: "Core",
                    duration: "8 weeks",
                    focus: "Fluorescence and Analysis",
                    subtopics: ["FISH", "Nucleic Acid Isolation & Quantitation", "Restriction Enzyme Digestion", "Fragment Analysis"]
                }
            ],
            projects: ["FISH Technique Project"],
            assessments: ["Molecular Techniques Quiz"]
        },
        {
            month: 11,
            name: "November",
            topics: [
                {
                    id: 3,
                    topic: "Techniques and Methods",
                    level: "Core",
                    duration: "8 weeks",
                    focus: "Quantitative Methods",
                    subtopics: ["Quantitative PCR and RT-PCR", "Nucleic Acid Sequencing", "Next Generation Sequencing"]
                }
            ],
            projects: ["NGS Data Analysis Project"],
            assessments: ["Quantitative Methods Test"]
        },
        {
            month: 12,
            name: "December",
            topics: [
                {
                    id: 3,
                    topic: "Techniques and Methods",
                    level: "Core",
                    duration: "8 weeks",
                    focus: "Advanced Techniques",
                    subtopics: ["Constitutional Arrays", "Somatic Arrays", "Melt Curve Analysis", "Tumor Mutational Burden"]
                }
            ],
            projects: ["Array Analysis Project"],
            assessments: ["Year 1 Comprehensive Exam"]
        }
    ],
    year2: [
        {
            month: 13,
            name: "January",
            topics: [
                {
                    id: 4,
                    topic: "Assay Performance and Validation",
                    level: "Core",
                    duration: "4 weeks",
                    focus: "Validation Principles",
                    subtopics: ["Proficiency Testing", "Validation versus Verification", "Preanalytical Considerations"]
                }
            ],
            projects: ["Assay Validation Project"],
            assessments: ["Validation Principles Quiz"]
        },
        {
            month: 14,
            name: "February",
            topics: [
                {
                    id: 4,
                    topic: "Assay Performance and Validation",
                    level: "Core",
                    duration: "4 weeks",
                    focus: "Specimen Handling",
                    subtopics: ["Stability", "Specimen Selection", "Specimen Collection", "Anticoagulant", "Fixation"]
                }
            ],
            projects: ["Specimen Stability Study"],
            assessments: ["Specimen Handling Test"]
        },
        {
            month: 15,
            name: "March",
            topics: [
                {
                    id: 4,
                    topic: "Assay Performance and Validation",
                    level: "Core",
                    duration: "4 weeks",
                    focus: "Results and Reporting",
                    subtopics: ["Results, Interpretation, & Follow-up Testing", "Variant Classification", "Reporting"]
                }
            ],
            projects: ["Variant Classification Project"],
            assessments: ["Reporting Standards Quiz"]
        },
        {
            month: 16,
            name: "April",
            topics: [
                {
                    id: 5,
                    topic: "Quality",
                    level: "Core",
                    duration: "3 weeks",
                    focus: "Quality Systems",
                    subtopics: ["Quality Assurance", "Quality Control", "Internal Controls", "Quantitative Controls"]
                }
            ],
            projects: ["Quality System Audit"],
            assessments: ["Quality Management Test"]
        },
        {
            month: 17,
            name: "May",
            topics: [
                {
                    id: 6,
                    topic: "Ethical, Legal, and Regulatory Issues",
                    level: "Advanced Resident",
                    duration: "4 weeks",
                    focus: "Regulatory Framework",
                    subtopics: ["IRB", "Consent", "HIPAA", "GINA", "Gene Patent"]
                }
            ],
            projects: ["Regulatory Compliance Review"],
            assessments: ["Regulatory Knowledge Quiz"]
        },
        {
            month: 18,
            name: "June",
            topics: [
                {
                    id: 6,
                    topic: "Ethical, Legal, and Regulatory Issues",
                    level: "Advanced Resident",
                    duration: "4 weeks",
                    focus: "Laboratory Standards",
                    subtopics: ["CLIA", "CAP", "CMS", "FDA: LDT/LDP, IUO, RUO"]
                }
            ],
            projects: ["Laboratory Accreditation Project"],
            assessments: ["Laboratory Standards Exam"]
        },
        {
            month: 19,
            name: "July",
            topics: [
                {
                    id: 6,
                    topic: "Ethical, Legal, and Regulatory Issues",
                    level: "Advanced Resident",
                    duration: "4 weeks",
                    focus: "Billing and Utilization",
                    subtopics: ["CPT", "ICD", "Laboratory Utilization"]
                }
            ],
            projects: ["Billing Analysis Project"],
            assessments: ["Billing and Coding Quiz"]
        },
        {
            month: 20,
            name: "August",
            topics: [
                {
                    id: 7,
                    topic: "Indications for Testing",
                    level: "Advanced Resident",
                    duration: "3 weeks",
                    focus: "Predictive and Diagnostic Testing",
                    subtopics: ["Presymptomatic / Predictive", "Diagnostic"]
                }
            ],
            projects: ["Testing Indication Case Studies"],
            assessments: ["Testing Indications Quiz"]
        },
        {
            month: 21,
            name: "September",
            topics: [
                {
                    id: 7,
                    topic: "Indications for Testing",
                    level: "Advanced Resident",
                    duration: "3 weeks",
                    focus: "Specialized Testing",
                    subtopics: ["Preimplantation Genetic Diagnosis (PGD)", "Carrier Screening", "Newborn Screening"]
                }
            ],
            projects: ["Specialized Testing Protocol"],
            assessments: ["Specialized Testing Exam"]
        },
        {
            month: 22,
            name: "October",
            topics: [
                {
                    id: 1,
                    topic: "Normal Structure and Function",
                    level: "Core",
                    duration: "Review",
                    focus: "Comprehensive Review",
                    subtopics: ["All Core Concepts Review"]
                }
            ],
            projects: ["Comprehensive Case Study 1"],
            assessments: ["Mock Board Exam 1"]
        },
        {
            month: 23,
            name: "November",
            topics: [
                {
                    id: 2,
                    topic: "Molecular Genetic Principles",
                    level: "Core",
                    duration: "Review",
                    focus: "Advanced Principles Review",
                    subtopics: ["All Principles Review"]
                }
            ],
            projects: ["Comprehensive Case Study 2"],
            assessments: ["Mock Board Exam 2"]
        },
        {
            month: 24,
            name: "December",
            topics: [
                {
                    id: 3,
                    topic: "Techniques and Methods",
                    level: "Core",
                    duration: "Review",
                    focus: "Final Review and Preparation",
                    subtopics: ["All Techniques Review"]
                }
            ],
            projects: ["Final Capstone Project"],
            assessments: ["Final Board Exam"]
        }
    ]
};

