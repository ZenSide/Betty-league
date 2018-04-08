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
        },
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