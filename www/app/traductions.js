//////////////////////////////////////////////////////
///////////////SALUT LA FOULE/////////////////////////
//////////////////////////////////////////////////////
var translations = {
    en : {
    },
    fr : {
        MESSAGES : {
            GENERALERROR : 'Un problême est survenu, réessaye plus tard',
            NOCON : 'Connecte toi à internet',
            NOBETTYWORLD : 'Betty World non trouvé',
            NONEXTOPENSHOWDOWN : 'Pas de paris ouverts',
            BETTYLEAGUENOTFOUND : 'Betty League non trouvée',
            SHOWDOWNNOTFOUND : 'Match non trouvé',
            NOMOREPRIVATELEAGUE : 'Vous ne pouvez pas créer plus de leagues de ce type',
        },
        USER : {
            ASSERT : {
                USERNAME : 'Champs pseudo obligatoire',
                EMAIL : 'Champs email obligatoire',
                EMAILFORM : 'Format d\'email invalide',
                PASSWORD : 'Champs mot de passe obligatoire',
                UNIKUSERNAME : "Ce nom d'utilisateur est déjà pris",
                UNIKEMAIL : "Cet email est déjà pris",
            }
        },
        LOGIN : {
            AUTHSUCCESS : 'Connection réussie',
            SIGNSUCCESS : 'Inscription réussie',
            AUTHFAIL : 'Echec de la connection, verifiez vos identifiants',
            PLACEHOLDERS : {
                EMAIL : 'e-mail',
                USERNAME : 'e-mail',
                PSW: 'mot de passe',
            },
            FOOTER : {
                MDP : 'MDP perdu',
                SIGN : 'Inscription',
                LOG : 'Connection',
                FB : 'Connection Facebook'
            }
        },
        SIGNIN : {
            PLACEHOLDERS : {
                EMAIL : 'e-mail',
                PSW: 'mot de passe',
                CONFIRMPSW: 'confirme ton mot de passe',
                PSEUDO: 'pseudo',
                NEXT: 'Continuer'
            },
            MESSAGES : {
                PASSWORDDIFF : 'Les mots de passe diffèrent',
                required : {
                    btUsername : "nom d'utilisateur requis",
                    btEmail : "email requis",
                    btPlainPassword : "mot de passe requis",
                    btPassword : "mot de passe requis",
                    btPseudo : "pseudo requis",
                    btConfirmPassword : "confirmation du mot de passe requise",
                    btNewLeagueName : "vous devez donner un nom à votre league"
                },
                email : {
                    btEmail : "format d'email invalide",
                }
            }
        },
        CHOOSELEAGUE : {
            BETTY : "Betty League",
            PRIVATES : "Ligues privées"
        },
        TITLES : {
            LOGIN : "Connectez vous à Betty !",
            SIGNIN : "Inscription",
            SIGNIN2 : "Finalisez l'inscription",
            CHOOSELEAGUE : "Bienvenue sur BettyLeague"
        },
        SHOWDOWN : {
            ROUNDSUFFIX : "ème journée",
            AGGREGATE_TITLE : "match retour",
            AGGREGATE_SCORE : "cumul des deux matchs",
            BET : "parier !",
            MODIFY : "modifier",
            OPEN_BET : "paris ouverts",
            REPORTE : "reporté",
            CLOSED : "match terminé",
            CALENDAR : "Calendrier",
            LIVE : "LIVE",
            POT_GAIN : 'Gain potentiel',
            GAIN : 'Gain :',
            TOTAL_GAIN : 'Gain  total',
            "WINNER_GAIN" : "Gain sur le vainqueur",
            "SCORE_GAIN" : "Gain sur le score",
            BET_FORM : {
                "TITLE" : "Ton pari",
                "HOW_MANY_GOALS" : "Combien de buts pour",
                "SHOOTOUT_WARNING" : "Sur ce score il va y avoir une séance de tirs au but.",
                "WHO_WIN" : "Qui va l'emporter ?",
                "WHO_QUALIF" : "Qui va se qualifier ?",
                "EMPTY_SCORE" : "Tu dois saisir un score",
                "EMPTY_WINNER" : "Tu dois choisir une équipe"
            },
            BET_SUMMARY : {
                "MY_BETS" : "ton pari et ce que tu peux gagner",
                "ON_QUALIF" : "sur une <b>qualification</b> de",
                "ON_WIN" : "sur une <b>victoire</b> de",
                "ON_DRAW" : "sur un match nul",
                "ON_SCORE" : "sur un <b>score</b> de",
                "USER_PERCENT" : "des parieurs",
                "ODD" : "Cote",
                "DETAIL" : "Detail des cotes",
            },
            MODAL_ODD_DETAIL : {
                "TITLE" : "Détail des cotes",
                "WINNER" : "Vainqueur",
                "QUALIF" : "Qualifié",
                "DRAW" : "Match nul",
                "ODD" : 'Cote',
                "PERCENT" : "des paris",
                "SCORE" : "Score exacte"
            }
        },
        RANKING : {
            "full_season": "Saison",
            "half_season": "Mi Saison",
            "for_rounds": "Mois",
            "round": "Journée"
        },
        COUNTDOWN : {
            d:'j',
            h:'h',
            m:'m',
            s:'s'
        },
        COMMUNITY : {
            TITLE : "Ta communauté",
            TITLE_LEAGUES : "Tes leagues privées",
            WORLD_CUP_SPEECH : "A l'occasion de la coupe du monde 2018 tu peux créer une betty league privée pour te mesurer à tes amis et ou des gens que tu aimes pas trop",
            NEW_WORLD_CUP : "Créer une Coupe du monde privée",
            JOIN_LEAGUE : "Rejoindre une league privée",
            NEW_LEAGUE : "Nouvelle league privée",
            NEW_VALIDATE : "Valider",
            PLACEHOLDERS : {
                NAME : "Nom de ta league"
            },
            NEW_LEAGUE_CREATED : "Ta league a bien été créée !",
            CREATED_BY: "Créée par",
            PLAY: "Jouer !"
        }
    }
}
;

betty2App.config(['$translateProvider', function ($translateProvider) {
    // add translation table
    $translateProvider
        .translations('en', translations.en)
        .translations('fr', translations.fr)
        .preferredLanguage('fr');
}]);