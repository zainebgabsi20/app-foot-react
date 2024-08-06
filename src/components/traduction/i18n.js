import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          league: {
            COSAFA_Cup: "COSAFA Cup",
            Euro: "Euro",
            Premier_League: "Premier League"
          },
          "draw": {
            "title": "Draw",
             "round_semi_finals": "Round: Semi-finals",
    "round_final": "Round: Final",
    "round_of_16_quarterfinals": "Round of 16 & Quarter-finals",
    "quarterfinals_semifinals": "Quarter-finals & Semi-finals",
    "semi_finals": "Semi-finals",
    "final": "Final"
          },
          status: {
            finished: "Finished",
            finishedwithpen: "Finished with Penalty",
            "finishedwithpen.": "Finished with Penalty",
            finishedaet: "Finished after Extra Time",
            notstarted: "Not Started",
            postponed: "Postponed",
            halftime: "Halftime",
            inprogress: "In Progress"
          },
          stage: {
            group_stage: "Group stage",
            playoffs: "Playoffs",
            regular_season: "Regular Season"
          },
          group: {
            group_b: "Group B",
            group_a: "Group A",
            knockout_stage: "Knockout stage"
          },
          match: {
            home: "Home",
            away: "Away",
            score: "Score",
            time: "Time"
          },
          match_details: {
            title: "Match Details"
          },
          common: {
            standing: "Standing",
            draw: "Draw",
            incidents: "Incident",
            lineups: "Lineup",
            comment: "Comment",
            substitutes: "Substitutes",
            stats: "Stats",
            h2h: "H2H",
            all: "All",
            team: "Team",
            hot: "Hot",
            popular: "Popular",
            live: "Live",
            loading: "Loading...",
            no_matches: "No matches available",
            latest_matches: "Latest Matches",
            first_half: "First Half",
            second_half: "Second Half",
            extra_time: "Extra Time"
          },
          stats: {
            ball_possession: "Ball Possession",
            shots_on: "Shots On",
            shots_off: "Shots Off",
            blocked_shots: "Blocked Shots",
            crosses: "Crosses",
            corners: "Corners",
            offsides: "Offsides",
            action_areas: "Action Areas",
            attacks: "Attacks",
            ball_safe: "Ball Safe",
            crossing_accuracy: "Crossing Accuracy",
            dangerous_attacks: "Dangerous Attacks",
            fouls: "Fouls",
            free_kick: "Free Kick",
            goal_attempts: "Goal Attempts",
            goal_kick: "Goal Kick",
            goals: "Goals",
            injuries: "Injuries",
            key_passes: "Key Passes",
            passing_accuracy: "Passing Accuracy",
            penalties: "Penalties",
            possession_time: "Possession Time",
            red_cards: "Red Cards",
            shots_total: "Shots Total",
            substitutions: "Substitutions",
            throw_in: "Throw In",
            xg: "XG",
            yellow_cards: "Yellow Cards",
            yellow_red_cards: "Yellow Red Cards"
          }
        }
      },
      fr: {
        translation: {
          league: {
            COSAFA_Cup: "COSAFA Cup",
            Euro: "Euro",
            Premier_League: "Premier League"
          },
          status: {
            finished: "Terminé",
            "finishedwithpen.": "Terminé avec tir au but",
            finishedaet: "Terminé après prolongation",
            notstarted: "Pas commencé",
            postponed: "Reporté",
            halftime: "Mi-temps",
            inprogress: "En cours"
          },
          stage: {
            group_stage: "Phase de groupes",
            playoffs: "Playoffs",
            regular_season: "Saison régulière"
          },
          
            "draw": {
              "title": "Tirage",
              "round_semi_finals": "Tour: Demi-finales",
    "round_final": "Tour: Finale",
    "round_of_16_quarterfinals": "Huitièmes de finale & Quarts de finale",
    "quarterfinals_semifinals": "Quarts de finale & Demi-finales",
    "semi_finals": "Demi-finales",
    "final": "Finale"
            },
          group: {
            group_b: "Groupe B",
            group_a: "Groupe A",
            knockout_stage: "Phase à élimination directe"
          },
          match: {
            home: "Domicile",
            away: "Extérieur",
            score: "Score",
            time: "Temps"
          },
          match_details: {
            title: "Détails du Match"
          },
          common: {
            standing: "Classement",
            draw: "Tirage",
            incident: "Incident",
            lineup: "Composition",
            comment: "Commentaire",
            substitutes: "Remplaçants",
            stats: "Stat",
            h2h: "FàF",
            all: "Tout",
            team: "Équipe",
            hot: "Chaud",
            popular: "Populaire",
            live: "En direct",
            loading: "Chargement...",
            no_matches: "Aucun match disponible",
            latest_matches: "Derniers matchs",
            first_half: "Première Mi-temps",
            second_half: "Deuxième Mi-temps",
            extra_time: "Temps Supplémentaire"
          },
          stats: {
            ball_possession: "Possession de Balle",
            shots_on: "Tirs Cadrés",
            shots_off: "Tirs Non Cadrés",
            blocked_shots: "Tirs Bloqués",
            crosses: "Centres",
            corners: "Corners",
            offsides: "Hors-jeu",
            action_areas: "Zones d'Action",
            attacks: "Attaques",
            ball_safe: "Ballon Sûr",
            crossing_accuracy: "Précision des Centres",
            dangerous_attacks: "Attaques Dangereuses",
            fouls: "Fautes",
            free_kick: "Coup Franc",
            goal_attempts: "Tentatives de But",
            goal_kick: "Renvoyés aux Buts",
            goals: "Buts",
            injuries: "Blessures",
            key_passes: "Passes Clés",
            passing_accuracy: "Précision des Passes",
            penalties: "Pénalités",
            possession_time: "Temps de Possession",
            red_cards: "Cartons Rouges",
            shots_total: "Total des Tirs",
            substitutions: "Remplacements",
            throw_in: "Toucher",
            xg: "XG",
            yellow_cards: "Cartons Jaunes",
            yellow_red_cards: "Cartons Jaunes-Rouges"
          }
        }
      },
      ar: {
        translation: {
          league: {
            COSAFA_Cup: "كأس كوسافا",
            Euro: "اليورو",
            Premier_League: "الدوري الممتاز"
          },
          status: {
            finished: "منتهي",
            "finishedwithpen.": "منتهي بركلات الترجيح",
            finishedaet: "انتهى بعد الوقت الإضافي",
            notstarted: "لم تبدأ",
            postponed: "مؤجل",
            halftime: "نصف الوقت",
            inprogress: "قيد التقدم"
          },
          stage: {
            group_stage: "مرحلة المجموعات",
            playoffs: "الأدوار النهائية",
            regular_season: "الموسم العادي"
          },
          group: {
            group_b: "المجموعة ب",
            group_a: "المجموعة أ",
            knockout_stage: "المرحلة الإقصائية"
          },
          match: {
            home: "الداخل",
            away: "الخارج",
            score: "النتيجة",
            time: "الوقت"
          },
          match_details: {
            title: "تفاصيل المباراة"
          },
          "draw": {
    "title": "السحب",
    "round_semi_finals": "الجولة: نصف النهائي",
    "round_final": "الجولة: النهائي",
    "round_of_16_quarterfinals": "دور الـ 16 والربع النهائي",
    "quarterfinals_semifinals": "الربع النهائي ونصف النهائي",
    "semi_finals": "نصف النهائي",
    "final": "النهائي"
  },
          common: {
            standing: "الترتيب",
            draw: "السحب",
            incident: "حادث",
            lineup: "التشكيلة",
            comment: "تعليق",
            substitutes: "البدلاء",
            stats: "إحصائيات",
            h2h: "مقابلة وجها لوجه",
            all: "الكل",
            team: "الفريق",
            hot: "ساخن",
            popular: "شائع",
            live: "مباشر",
            loading: "جار التحميل...",
            no_matches: "لا توجد مباريات متاحة",
            latest_matches: "آخر المباريات",
            first_half: "الشوط الأول",
            second_half: "الشوط الثاني",
            extra_time: "الوقت الإضافي"
          },
          stats: {
            ball_possession: "استحواذ الكرة",
            shots_on: "تسديدات على الهدف",
            shots_off: "تسديدات خارج الهدف",
            blocked_shots: "تسديدات محجوبة",
            crosses: "الكرات العرضية",
            corners: "الركنيات",
            offsides: "التسللات",
            action_areas: "مناطق العمل",
            attacks: "هجمات",
            ball_safe: "أمان الكرة",
            crossing_accuracy: "دقة العرضيات",
            dangerous_attacks: "هجمات خطيرة",
            fouls: "الأخطاء",
            free_kick: "ركلة حرة",
            goal_attempts: "محاولات الهدف",
            goal_kick: "ركلات المرمى",
            goals: "الأهداف",
            injuries: "الإصابات",
            key_passes: "التمريرات الرئيسية",
            passing_accuracy: "دقة التمرير",
            penalties: "ركلات الجزاء",
            possession_time: "وقت الاستحواذ",
            red_cards: "البطاقات الحمراء",
            shots_total: "إجمالي التسديدات",
            substitutions: "التبديلات",
            throw_in: "الرميات الجانبية",
            xg: "XG",
            yellow_cards: "البطاقات الصفراء",
            yellow_red_cards: "البطاقات الصفراء والحمراء"
          }
        }
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already protects from XSS
    }
  });

export default i18n;
