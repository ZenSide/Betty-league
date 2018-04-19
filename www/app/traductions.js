//////////////////////////////////////////////////////
///////////////SALUT LA FOULE/////////////////////////
//////////////////////////////////////////////////////
var translations = {
    en : {
    },
    fr : {
        MESSAGES : {
            GENERALERROR : 'Un problême est survenu, réessayez plus tard',
            NOCON : 'Veuillez vous connecter à internet',
            NOBETTYWORLD : 'Betty World non trouvé',
            NONEXTOPENSHOWDOWN : 'Pas de paris ouverts',
            BETTYLEAGUENOTFOUND : 'Betty League non trouvée',
            SHOWDOWNNOTFOUND : 'Match non trouvé'
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
                CONFIRMPSW: 'confirmez mot de passe',
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
                    btConfirmPassword : "confirmation du mot de passe requise"
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
            OPEN_BET : "paris ouverts",
            REPORTE : "reporté",
            CLOSED : "match terminé",
            LIVE : "LIVE",
            BET_FORM : {
                "TITLE" : "Mon pari",
                "HOW_MANY_GOALS" : "Combien de buts pour",
                "SHOOTOUT_WARNING" : "Sur ce score il va y avoir une séance de tirs au but.",
                "WHO_WIN" : "Qui va l'emporter ?",
                "WHO_QUALIF" : "Qui va se qualifier ?",
                "EMPTY_SCORE" : "Vous devez saisir un score",
                "EMPTY_WINNER" : "Vous devez choisir une équipe"
            }
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