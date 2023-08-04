import { NextResponse, NextRequest } from "next/server";
import cors from "cors";

const pathways = [
    {
        "department": "Arts",
        "pathways": [
            {
                "name": "Visual and Media Arts",
                "description": "In this pathway, students are offered a full range of opportunities to create artwork in visual, electronic, and experimental media; to situate contemporary art and visual culture historically and culturally; and to participate in activist and community-based art practices.",
                "clusters": [
                    {
                        "name": "Studio Art",
                        "courses": [
                            "ARTS-1050",
                            "ARTS-1200",
                            "ARTS-2200",
                            "ARTS-2090",
                            "ARTS-2210",
                            "ARTS-2220",
                            "ARTS-2540",
                            "ARTS-4200",
                            "ARTS-4210",
                            "ARTS-4220",
                            "ARTS-4260"
                        ]
                    },
                    {
                        "name": "Electronic Arts",
                        "courses": [
                            "INQR-1170",
                            "ARTS-1020",
                            "ARTS-1050",
                            "ARTS-2040",
                            "ARTS-2060",
                            "ARTS-2070",
                            "ARTS-2230",
                            "ARTS-2540",
                            "ARTS-2700",
                            "ARTS-4060",
                            "ARTS-4070",
                            "ARTS-4090",
                            "ARTS-4860"
                        ]
                    },
                    {
                        "name": "Video",
                        "courses": [
                            "INQR-1030",
                            "INQR-1040",
                            "INQR-1300",
                            "ARTS-1030",
                            "ARTS-2010",
                            "ARTS-2540",
                            "ARTS-4040",
                            "ARTS-4440",
                            "GSAS-4440",
                            "ARTS-4630",
                            "ARTS-4050"
                        ]
                    },
                    {
                        "name": "Social Practice and Hybrid Genres",
                        "courses": [
                            "ARTS-2180",
                            "ARTS-4120",
                            "ARTS-4140",
                            "ARTS-4230",
                            "ARTS-4240",
                            "ARTS-4250",
                            "ARTS-4560",
                            "ARTS-4640"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Electronic Arts",
                    "Studio Arts",
                    "Video, Performance, and Social Practice"
                ]
            },
            {
                "name": "Music and Sound",
                "description": "In this pathway, students are offered a full range of opportunities to perform, compose, and record music; to program and develop novel music technologies; to produce and design sound for screen media; and to situate music historically and culturally across multiple genres.",
                "clusters": [
                    {
                        "name": "Music & Culture",
                        "courses": [
                            "INQR-1180",
                            "ARTS-2180",
                            "ARTS-2520",
                            "ARTS-2500",
                            "ARTS-2510",
                            "ARTS-2540",
                            "ARTS-2560",
                            "ARTS-2570",
                            "ARTS-4180",
                            "ARTS-4440",
                            "GSAS-4440",
                            "ARTS-4500",
                            "ARTS-4880"
                        ]
                    },
                    {
                        "name": "Composition & Production",
                        "courses": [
                            "INQR-1700",
                            "ARTS-1380",
                            "ARTS-2020",
                            "ARTS-2380",
                            "ARTS-2560",
                            "GSAS-2560",
                            "ARTS-2610",
                            "ARTS-2700",
                            "ARTS-4160",
                            "ARTS-4390",
                            "ARTS-4380",
                            "ARTS-4440",
                            "GSAS-4440",
                            "ARTS-4600",
                            "ARTS-4700",
                            "ARTS-4880"
                        ]
                    },
                    {
                        "name": "Music Performance",
                        "courses": [
                            "INQR-1700",
                            "ARTS-1380",
                            "ARTS-2080",
                            "ARTS-2300",
                            "ARTS-2310",
                            "ARTS-2350",
                            "ARTS-2600",
                            "ARTS-2750"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Music"
                ]
            }
        ]
    },
    {
        "department": "Communication & Media",
        "pathways": [
            {
                "name": "Global Languages and Cultures",
                "description": "This pathway promotes the development of skills to help students effectively communicate both domestically and internationally, as well as enhance their appreciation for other cultures. Students who select this pathway must have all courses that are part of the pathway be in the <i>same foreign language</i>. These courses may be fulfilled through transfer credits.",
                "clusters": [
                    {
                        "name": "Global Languages and Cultures",
                        "courses": [
                            "IHSS-1492",
                            "LANG-1000",
                            "LANG-2000",
                            "LANG-4000",
                            "LANG-4455",
                            "COMM-4535"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Chinese"
                ]
            },
            {
                "name": "Graphic and Interactive Media Design",
                "description": "This pathway integrates the theory and practice of graphic and interactive media design in print and digital media. Students are prepared to use creative and critical thinking to solve visual communication problems in diverse contexts, reaching target audiences with words, symbols, and images. Offerings in integrative design also prepare students for creating forms of multimedia communication and data representation.",
                "clusters": [
                    {
                        "name": "Graphic Design",
                        "courses": [
                            "INQR-1562",
                            "COMM-2570",
                            "COMM-2660",
                            "COMM-4460",
                            "COMM-4470",
                            "COMM-4730",
                            "COMM-4970"
                        ]
                    },
                    {
                        "name": "Interactive Media Design",
                        "courses": [
                            "COMM-4320",
                            "COMM-4420",
                            "COMM-4770",
                            "COMM-4780",
                            "COMM-4880"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Graphic Design",
                    "Interactive Media Design"
                ]
            },
            {
                "name": "Narrative and Storytelling",
                "description": "The Narrative and Storytelling Pathway offers discussion-oriented courses across a range of literary genres and themes, with a choice of emphasis on either literature, creative writing, or both. Students will learn to read and write literary art critically and creatively, with clarity and imagination, and with sensitivity to multi-cultural expressions of diversity.",
                "clusters": [
                    {
                        "name": "Narrative and Storytelling",
                        "courses": [
                            "WRIT-1110",
                            "IHSS-1550",
                            "WRIT-1769",
                            "LITR-2110",
                            "WRIT-2330",
                            "LITR-2410",
                            "COMM-2616",
                            "COMM-2750",
                            "LITR-4150",
                            "LITR-4230",
                            "LITR-4770",
                            "LITR-4880"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Narrative and Storytelling"
                ]
            },
            {
                "name": "Strategic Writing",
                "description": "This pathway is designed to train versatile, critical, and self-possessed 21st-century communicators. Students who successfully complete this pathway will demonstrate the ability to make focused audience-appropriate arguments; communicate effectively across diverse rhetorical, sociocultural, and disciplinary contexts; and respond creatively to the analytical demands involved with developing, arranging, and revising ideas and arguments.",
                "clusters": [
                    {
                        "name": "Strategic Writing",
                        "courses": [
                            "WRIT-1110",
                            "WRIT-2110",
                            "WRIT-2330",
                            "WRIT-2340",
                            "COMM-2520",
                            "COMM-4188",
                            "COMM-4288",
                            "WRIT-4380",
                            "WRIT-4410",
                            "WRIT-4550",
                            "COMM-4780"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Writing",
                    "Strategic Communications"
                ]
            },
            {
                "name": "Media and Culture",
                "description": "This pathway examines different forms of expression and their cultural contexts in a variety of media, including film, television, photography and new media. Its components will enhance creative and critical thinking, communication practices, and awareness of cultural and individual identities. The focus on cultural and media literacy will improve career readiness and social awareness of those in any program at RPI.",
                "clusters": [
                    {
                        "name": "Media and Culture",
                        "courses": [
                            "IHSS-1492",
                            "IHSS-1560",
                            "WRIT-2340",
                            "LITR-2410",
                            "COMM-2440",
                            "COMM-2520",
                            "COMM-2616",
                            "COMM-2750",
                            "COMM-4188",
                            "COMM-4288",
                            "COMM-4535",
                            "COMM-4530",
                            "COMM-4540",
                            "COMM-4580"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Media and Culture"
                ]
            }
        ]
    },
    {
        "department": "Cognitive Science",
        "pathways": [
            {
                "name": "Cognitive Science",
                "description": "Discover Cognitive Science: a young but fast-growing field focused on the study of the mind from the perspectives of philosophy, psychology, neuroscience, linguistics, and artificial intelligence. This pathway will introduce students to the major ideas and theories from these areas, as they relate to the study of the mind and intelligence.",
                "required": [
                    "COGS-2120"
                ],
                "clusters": [
                    {
                        "name": "Artificial Intelligence",
                        "courses": [
                            "INQR-1140",
                            "INQR-1235",
                            "COGS-4210",
                            "COGS-4410",
                            "COGS-4420",
                            "COGS-4430",
                            "COGS-4640",
                            "COGS-4880"
                        ]
                    },
                    {
                        "name": "Cognitive Science",
                        "courses": [
                            "PSYC-4370",
                            "PSYC-4410",
                            "COGS-2000",
                            "COGS-4000"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Cognitive Science",
                    "Cognitive Science of Artificial Intelligence"
                ]
            },
            {
                "name": "Psychological Science",
                "description": "The ability to understand and predict how people act and think is more important than ever in addressing many of the greatest challenges that we face as a society.  In this pathway, students will learn how behavior and thought are influenced by cognitive, emotional, developmental, social, and environmental factors, and how to apply psychological principles.",
                "required": [
                    "PSYC-1200"
                ],
                "clusters": [
                    {
                        "name": "Behavioral and Cognitive Neuroscience",
                        "courses": [
                            "PSYC-4330",
                            "PSYC-4360",
                            "PSYC-4500",
                            "PSYC-4600",
                            "PSYC-4610",
                            "PSYC-4700"
                        ]
                    },
                    {
                        "name": "Psychological Science",
                        "courses": [
                            "PSYC-2310",
                            "PSYC-2730",
                            "PSYC-4110",
                            "PSYC-4200",
                            "PSYC-4310",
                            "PSYC-4350",
                            "PSYC-4370",
                            "PSYC-4450",
                            "PSYC-4500",
                            "PSYC-4720"
                        ]
                    },
                    {
                        "name": "General Psychology",
                        "course": [
                            "PSYC-2000",
                            "PSYC-4000"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Behavioral and Cognitive Neuroscience",
                    "General Psychology",
                    "Psychological Science"
                ]
            },
            {
                "name": "Philosophy and Logic",
                "description": "In this pathway, students will learn to reason more precisely, think more critically, and ask more penetrating and foundational questions about enduring and contemporary problems in ethics, science, technology, religion, and politics including some of the biggest challenges that humanity currently faces.",
                "clusters": [
                    {
                        "name": "Philosophy of Logic, Computation, and Mind",
                        "courses": [
                            "INQR-1235",
                            "PHIL-2100",
                            "PHIL-2140",
                            "PHIL-4140",
                            "PHIL-4420"
                        ]
                    },
                    {
                        "name": "Philosophy",
                        "courses": [
                            "PHIL-1110",
                            "INQR-1150",
                            "INQR-1160",
                            "INQR-1165",
                            "PHIL-2400",
                            "PHIL-4130",
                            "PHIL-4240",
                            "PHIL-4300",
                            "PHIL-4480"
                        ]
                    },
                    {
                        "name": "Miscellaneous Philosophy",
                        "courses": [
                            "INQR-1140",
                            "PHIL-2000",
                            "PHIL-4000"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Philosophy",
                    "Philosophy of Logic, Computation, and Mind"
                ]
            }
        ]
    },
    {
        "department": "Economics",
        "pathways": [
            {
                "name": "Economics",
                "description": "Economics is the study of human behavior, incentives, markets, and governments. Students learn the fundamental models and data analytics of decision-making by individuals and firms, market dynamics, policy-making, globalization, financial economics, and more.",
                "required": [
                    "INQR-1200"
                ],
                "clusters": [
                    {
                        "name": "Economics",
                        "courses": [
                            "ECON-2000",
                            "ECON-4000"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Economics",
                    "Economics of Banking and Finance",
                    "Economics of Healthcare Markets",
                    "Economics of Quantitative Modeling",
                    "Economics of Technology and Innovation"
                ]
            }
        ]
    },
    {
        "department": "STS",
        "pathways": [
            {
                "name": "Science, Technology, and Society",
                "description": "The pathway in Science, Technology, and Society (STS) is designed for students broadly interested in the social and political dimensions of science, technology, engineering, and medicine. Students use political and social science methods to investigate scientific and technological developments.",
                "clusters": [
                    {
                        "name": "Science, Technology, and Society",
                        "courses": [
                            "INQR-1100",
                            "INQR-1110",
                            "INQR-1220",
                            "ITWS-1220",
                            "INQR-1240",
                            "INQR-1250",
                            "INQR-1320",
                            "INQR-1350",
                            "INQR-1570",
                            "INQR-1580",
                            "STSO-1000",
                            "STSO-2000",
                            "STSO-4000"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Science, Technology, and Society"
                ]
            }
        ]
    },
    {
        "department": "Interdisciplinary",
        "pathways": [
            {
                "name": "Ethics, Integrity, and Social Responsibility",
                "description": "In this Pathway, students analyze many aspects of the complex relationship between ethics and areas in science, technology, and engineering. These conversations are critical to ensure the ethical and accessible use of technology and to allow scientists and engineers to think critically and make informed decisions on personal, professional, and public policy levels.",
                "clusters": [
                    {
                        "name": "Ethics, Integrity, and Social Responsibility",
                        "courses": [
                            "INQR-1100",
                            "INQR-1140",
                            "INQR-1150",
                            "INQR-1160",
                            "INQR-1165",
                            "INQR-1350",
                            "INQR-1250",
                            "STSO-1100",
                            "ARTS-4250",
                            "ARTS-4240",
                            "ARTS-4560",
                            "PHIL-1110",
                            "PHIL-4240",
                            "PHIL-4300",
                            "PHIL-4500",
                            "STSO-4250",
                            "STSO-4340",
                            "STSO-4400"
                        ]
                    }
                ]
            },
            {
                "name": "Pre-Health",
                "description": "The Pre-Health pathway is designed for students who are planning to apply to medical school or pursuing other health-related careers. It includes coursework that is required as part of the medical school application process.",
                "required": [
                    "PSYC-1200",
                    "STSO-2520"
                ],
                "clusters": [
                    {
                        "name": "Pre-Health",
                        "courses": [
                            "WRIT-1110",
                            "WRIT-2110",
                            "WRIT-2340",
                            "WRIT-4380",
                            "WRIT-4410",
                            "WRIT-4550",
                            "COMM-2520",
                            "COMM-4460"
                        ]
                    }
                ]
            },
            {
                "name": "Extent and Limits of Rationality",
                "description": "People are not always as rational as they would like to think and are subject to a variety of cognitive and social biases.  People also have the power to correct for these biases, and to do good and constructive work. How can critical thinking be used constructively? How can people learn from their past mistakes? How can social institutions and policies be set up to ensure that wise decisions are made to create a world that lasts into the extended future?",
                "clusters": [
                    {
                        "name": "Extent and Limits of Rationality",
                        "courses": [
                            "INQR-1140",
                            "INQR-1180",
                            "INQR-1200",
                            "INQR-1235",
                            "INQR-1570",
                            "INQR-1510",
                            "COGS-2120",
                            "COMM-2520",
                            "ECON-4220",
                            "ECON-4270",
                            "PHIL-2100",
                            "PHIL-2140",
                            "PHIL-4130",
                            "PSYC-2100",
                            "PSYC-4370",
                            "STSO-4530",
                            "WRIT-2110",
                            "WRIT-2340",
                            "WRIT-4550"
                        ]
                    }
                ]
            },
            {
                "name": "History",
                "description": "The pathway designed for students interested in U.S. and world history. Courses all intersect in that they offer historical perspectives and approaches to thinking about various topics: from music, to technology, to medicine, to broader historical surveys (such as American History).",
                "clusters": [
                    {
                        "name": "History",
                        "courses": [
                            "INQR-1170",
                            "INQR-1300",
                            "INQR-1320",
                            "INQR-1580",
                            "INQR-1776",
                            "INQR-1570",
                            "ARTS-1050",
                            "ARTS-2500",
                            "ARTS-2510",
                            "STSO-2500",
                            "STSO-4420",
                            "STSO-4430",
                            "STSO-4440",
                            "STSO-4510",
                            "STSO-4530"
                        ]
                    }
                ]
            },
            {
                "name": "Public Health",
                "description": "The pathway in Public Health is designed for students interested in health-related careers who wish to develop skills and knowledge about global public health challenges. It also offers important courses for students on a pre-health/pre-med track beyond the pre-health/pre-med pathway.",
                "clusters": [
                    {
                        "name": "Public Health",
                        "courses": [
                            "INQR-1100",
                            "INQR-1150",
                            "PSYC-1200",
                            "STSO-1100",
                            "STSO-2520",
                            "COGS-4610",
                            "COGS-4700",
                            "PSYC-4500",
                            "PSYC-4610",
                            "PSYC-4700",
                            "STSO-4420",
                            "STSO-4440",
                            "STSO-4250",
                            "STSO-4430",
                            "STSO-4260",
                            "STSO-4400",
                            "STSO-4560"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Public Health"
                ]
            },
            {
                "name": "Well-Being: Body and Mind",
                "description": "How do we cultivate well-being in our lives? What are the relationships between individual, social and ecological health? The \"Well-being: Body and Mind\" Integrative Pathway explores well-being through theoretical and practical courses across a range of disciplines including philosophy, psychology, science and technology studies, health sciences, and the arts.",
                "clusters": [
                    {
                        "name": "Well-Being: HASS Inquiry",
                        "courses": [
                            "INQR-1110",
                            "INQR-1140",
                            "INQR-1175",
                            "INQR-1180",
                            "INQR-1700",
                            "INQR-1720",
                            "INQR-1560"
                        ]
                    },
                    {
                        "name": "Well-Being: Arts",
                        "courses": [
                            "ARTS-1200",
                            "ARTS-2180",
                            "ARTS-4180",
                            "ARTS-2300",
                            "ARTS-2310",
                            "ARTS-2350"
                        ]
                    },
                    {
                        "name": "Well-Being: Cognitive Science",
                        "courses": [
                            "COGS-4610",
                            "COGS-4700"
                        ]
                    },
                    {
                        "name": "Well-Being: Philosophy",
                        "courses": [
                            "PHIL-4240",
                            "PHIL-4500",
                            "STSO-4250"
                        ]
                    },
                    {
                        "name": "Well-Being: Psychology",
                        "courses": [
                            "PSYC-1200",
                            "PSYC-4430",
                            "PSYC-4440",
                            "PSYC-4500",
                            "PSYC-4610",
                            "PSYC-4700",
                            "PSYC-4730"
                        ]
                    },
                    {
                        "name": "Well-Being: Science, Technology, and Society",
                        "courses": [
                            "STSO-4400"
                        ]
                    },
                    {
                        "name": "Well-Being: Communications and Media",
                        "courses": [
                            "WRIT-2320",
                            "WRIT-2330",
                            "COMM-2750",
                            "COMM-2616",
                            "LITR-2410"
                        ]
                    }
                ],
                "compatibleMinor": [
                    "Well-Being"
                ]
            }
        ]
    }
];

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const departments = params.get("department").split(",");

  var blob = pathways;
  if (params.get("department")) {
    blob = blob.filter((c) =>
      departments.includes(c["department"])
    );
  }
  blob = blob.map((c) => c["pathways"]).flat();

  for(var [k,c] of Object.entries(blob)) {
    c["courses"] = c["clusters"].map((b) => b["courses"]).flat().concat(c["required"] != null ? c["required"] : [])
    c["clusters"] = undefined;
  }

  if (params.get("searchString")) {
    blob = blob.filter((c) =>
      c["name"]
        .toLowerCase()
        .includes(params.get("searchString").toLowerCase())
    );
  }

  return NextResponse.json( blob );
}
