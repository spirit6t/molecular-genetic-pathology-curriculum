// Lab Informatics Curriculum Data
// Based on PIER Essentials document

export interface Topic {
    id: string;
    title: string;
    description: string;
    learningObjectives: string[];
    subtopics: Subtopic[];
    resources: string[];
    practicalExercises: string[];
    estimatedHours: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Subtopic {
    id: string;
    title: string;
    description: string;
    learningObjectives: string[];
    resources: string[];
    estimatedHours: number;
}

export interface Resident {
    id: string;
    name: string;
    email: string;
    startDate: string;
    level: 'PGY-1' | 'PGY-2' | 'PGY-3' | 'PGY-4' | 'Fellow';
}

export interface Assignment {
    id: string;
    residentId: string;
    topicId: string;
    subtopicId?: string;
    assignedDate: string;
    dueDate: string;
    status: 'assigned' | 'in-progress' | 'completed';
    notes?: string;
}

export interface PracticalExercise {
    id: string;
    title: string;
    description: string;
    topicId: string;
    estimatedHours: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    instructions: string[];
    deliverables: string[];
    assessmentCriteria: string[];
}

export interface TwoYearCurriculum {
    year1: {
        quarters: Array<{
            quarter: string;
            focus: string;
            topics: string[];
            practicalExercises: string[];
        }>;
    };
    year2: {
        quarters: Array<{
            quarter: string;
            focus: string;
            topics: string[];
            practicalExercises: string[];
        }>;
    };
}

// Lab Informatics Topics
export const labInformaticsTopics: Topic[] = [
    {
        id: '1',
        title: 'Laboratory Information Systems (LIS) Fundamentals',
        description: 'Core concepts and architecture of laboratory information systems',
        learningObjectives: [
            'Understand LIS architecture and components',
            'Learn about data flow in laboratory systems',
            'Identify key stakeholders and their roles',
            'Understand integration with other healthcare systems'
        ],
        subtopics: [
            {
                id: '1.1',
                title: 'LIS Architecture',
                description: 'System architecture and design principles',
                learningObjectives: ['Understand client-server architecture', 'Learn about database design'],
                resources: ['LIS Architecture Guide', 'Database Design Principles'],
                estimatedHours: 4
            },
            {
                id: '1.2',
                title: 'Data Flow',
                description: 'How data moves through laboratory systems',
                learningObjectives: ['Map data flow processes', 'Identify bottlenecks'],
                resources: ['Data Flow Diagrams', 'Process Mapping Guide'],
                estimatedHours: 3
            }
        ],
        resources: ['LIS Fundamentals Textbook', 'System Architecture Documentation'],
        practicalExercises: ['LIS Design Project', 'Data Flow Mapping Exercise'],
        estimatedHours: 8,
        difficulty: 'Beginner'
    },
    {
        id: '2',
        title: 'Laboratory Data Standards',
        description: 'Standards and protocols for laboratory data exchange',
        learningObjectives: [
            'Understand HL7 messaging standards',
            'Learn about LOINC coding systems',
            'Master SNOMED CT terminology',
            'Apply standards in real-world scenarios'
        ],
        subtopics: [
            {
                id: '2.1',
                title: 'HL7 Standards',
                description: 'Health Level 7 messaging standards',
                learningObjectives: ['Understand HL7 message structure', 'Learn message types'],
                resources: ['HL7 Documentation', 'Message Examples'],
                estimatedHours: 6
            },
            {
                id: '2.2',
                title: 'Terminology Systems',
                description: 'LOINC and SNOMED CT coding systems',
                learningObjectives: ['Master LOINC codes', 'Understand SNOMED CT'],
                resources: ['LOINC User Guide', 'SNOMED CT Documentation'],
                estimatedHours: 5
            }
        ],
        resources: ['HL7 Standards Guide', 'LOINC User Manual', 'SNOMED CT Documentation'],
        practicalExercises: ['HL7 Message Creation', 'Terminology Mapping Exercise'],
        estimatedHours: 12,
        difficulty: 'Intermediate'
    },
    {
        id: '3',
        title: 'Quality Management Systems',
        description: 'Implementation and maintenance of quality management in laboratory informatics',
        learningObjectives: [
            'Understand ISO 15189 requirements',
            'Implement quality control processes',
            'Manage non-conformities',
            'Conduct internal audits'
        ],
        subtopics: [
            {
                id: '3.1',
                title: 'ISO 15189 Requirements',
                description: 'International standard for medical laboratories',
                learningObjectives: ['Understand standard requirements', 'Implement compliance measures'],
                resources: ['ISO 15189 Standard', 'Implementation Guide'],
                estimatedHours: 8
            },
            {
                id: '3.2',
                title: 'Quality Control',
                description: 'Quality control processes and procedures',
                learningObjectives: ['Design QC procedures', 'Monitor performance'],
                resources: ['QC Procedures Manual', 'Statistical Analysis Guide'],
                estimatedHours: 6
            }
        ],
        resources: ['ISO 15189 Standard', 'Quality Management Guide', 'Audit Procedures'],
        practicalExercises: ['Quality System Design', 'Audit Planning Exercise'],
        estimatedHours: 16,
        difficulty: 'Advanced'
    },
    {
        id: '4',
        title: 'Laboratory Automation',
        description: 'Automation technologies and their implementation in laboratory settings',
        learningObjectives: [
            'Understand automation technologies',
            'Design automated workflows',
            'Evaluate automation benefits',
            'Manage automation projects'
        ],
        subtopics: [
            {
                id: '4.1',
                title: 'Automation Technologies',
                description: 'Various automation technologies available',
                learningObjectives: ['Compare automation options', 'Select appropriate technology'],
                resources: ['Automation Technology Guide', 'Vendor Comparisons'],
                estimatedHours: 6
            },
            {
                id: '4.2',
                title: 'Workflow Design',
                description: 'Designing efficient automated workflows',
                learningObjectives: ['Map current workflows', 'Design optimized processes'],
                resources: ['Workflow Design Guide', 'Process Optimization Manual'],
                estimatedHours: 8
            }
        ],
        resources: ['Automation Guide', 'Workflow Design Manual', 'Project Management Guide'],
        practicalExercises: ['Automation Assessment', 'Workflow Design Project'],
        estimatedHours: 14,
        difficulty: 'Intermediate'
    },
    {
        id: '5',
        title: 'Data Analytics and Business Intelligence',
        description: 'Using data analytics to improve laboratory operations and outcomes',
        learningObjectives: [
            'Understand data analytics concepts',
            'Apply statistical methods',
            'Create dashboards and reports',
            'Use analytics for decision making'
        ],
        subtopics: [
            {
                id: '5.1',
                title: 'Statistical Analysis',
                description: 'Statistical methods for laboratory data',
                learningObjectives: ['Apply statistical tests', 'Interpret results'],
                resources: ['Statistics Textbook', 'Analysis Software Guide'],
                estimatedHours: 8
            },
            {
                id: '5.2',
                title: 'Dashboard Design',
                description: 'Creating effective dashboards and reports',
                learningObjectives: ['Design user-friendly interfaces', 'Present data effectively'],
                resources: ['Dashboard Design Guide', 'Visualization Best Practices'],
                estimatedHours: 6
            }
        ],
        resources: ['Data Analytics Guide', 'Statistics Textbook', 'Dashboard Design Manual'],
        practicalExercises: ['Data Analysis Project', 'Dashboard Creation Exercise'],
        estimatedHours: 14,
        difficulty: 'Advanced'
    }
];

// Residents
export const residents: Resident[] = [
    {
        id: '1',
        name: 'Dr. Natalie Ruiz',
        email: 'natalie.ruiz@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-4'
    },
    {
        id: '2',
        name: 'Dr. William Rodgers',
        email: 'william.rodgers@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-4'
    },
    {
        id: '3',
        name: 'Dr. Richard Kang',
        email: 'richard.kang@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-2'
    },
    {
        id: '4',
        name: 'Dr. Christina Maldonaldo',
        email: 'christina.maldonaldo@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-3'
    },
    {
        id: '5',
        name: 'Dr. Laura Glasscock',
        email: 'laura.glasscock@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-2'
    },
    {
        id: '6',
        name: 'Dr. Laura Luu',
        email: 'laura.luu@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-3'
    },
    {
        id: '7',
        name: 'Dr. Nick D\'Souza',
        email: 'nick.dsouza@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-1'
    },
    {
        id: '8',
        name: 'Dr. Noelani Ascio',
        email: 'noelani.ascio@hcahealthcare.com',
        startDate: '2024-07-01',
        level: 'PGY-1'
    }
];

// Practical Exercises
export const practicalExercises: PracticalExercise[] = [
    {
        id: '1',
        title: 'LIS Database Design Project',
        description: 'Design a database schema for a laboratory information system',
        topicId: '1',
        estimatedHours: 8,
        difficulty: 'Beginner',
        instructions: [
            'Analyze laboratory workflow requirements',
            'Design entity-relationship diagram',
            'Create database schema',
            'Document design decisions'
        ],
        deliverables: [
            'Entity-relationship diagram',
            'Database schema documentation',
            'Design rationale document'
        ],
        assessmentCriteria: [
            'Completeness of schema design',
            'Proper normalization',
            'Documentation quality',
            'Practical applicability'
        ]
    },
    {
        id: '2',
        title: 'HL7 Message Implementation',
        description: 'Implement HL7 message processing for laboratory results',
        topicId: '2',
        estimatedHours: 12,
        difficulty: 'Intermediate',
        instructions: [
            'Study HL7 message structure',
            'Implement message parser',
            'Create message validation',
            'Test with sample data'
        ],
        deliverables: [
            'HL7 message parser code',
            'Validation rules documentation',
            'Test cases and results',
            'Implementation report'
        ],
        assessmentCriteria: [
            'Code functionality',
            'Error handling',
            'Documentation quality',
            'Test coverage'
        ]
    },
    {
        id: '3',
        title: 'Quality Management System Design',
        description: 'Design and implement a quality management system for laboratory operations',
        topicId: '3',
        estimatedHours: 16,
        difficulty: 'Advanced',
        instructions: [
            'Analyze current quality processes',
            'Design quality management framework',
            'Implement key processes',
            'Create monitoring dashboards'
        ],
        deliverables: [
            'Quality management framework',
            'Process documentation',
            'Implementation plan',
            'Monitoring dashboard'
        ],
        assessmentCriteria: [
            'Framework completeness',
            'Process effectiveness',
            'Implementation feasibility',
            'Monitoring capabilities'
        ]
    }
];

// Two-Year Curriculum Timeline
export const twoYearCurriculum: TwoYearCurriculum = {
    year1: {
        quarters: [
            {
                quarter: 'Q1 (Months 1-3)',
                focus: 'Foundation and Basics',
                topics: ['1', '2'],
                practicalExercises: ['1']
            },
            {
                quarter: 'Q2 (Months 4-6)',
                focus: 'Intermediate Concepts',
                topics: ['2', '4'],
                practicalExercises: ['2']
            },
            {
                quarter: 'Q3 (Months 7-9)',
                focus: 'Advanced Applications',
                topics: ['3', '4'],
                practicalExercises: ['2']
            },
            {
                quarter: 'Q4 (Months 10-12)',
                focus: 'Integration and Projects',
                topics: ['3', '5'],
                practicalExercises: ['3']
            }
        ]
    },
    year2: {
        quarters: [
            {
                quarter: 'Q1 (Months 13-15)',
                focus: 'Specialization and Leadership',
                topics: ['4', '5'],
                practicalExercises: ['3']
            },
            {
                quarter: 'Q2 (Months 16-18)',
                focus: 'Research and Innovation',
                topics: ['5'],
                practicalExercises: ['3']
            },
            {
                quarter: 'Q3 (Months 19-21)',
                focus: 'Implementation and Change Management',
                topics: ['3', '4'],
                practicalExercises: ['3']
            },
            {
                quarter: 'Q4 (Months 22-24)',
                focus: 'Capstone and Transition',
                topics: ['1', '2', '3', '4', '5'],
                practicalExercises: ['1', '2', '3']
            }
        ]
    }
};