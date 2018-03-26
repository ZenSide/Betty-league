//////////////////////////////////////////////////////
///////////////SALUT LA FOULE/////////////////////////
//////////////////////////////////////////////////////
var translations = {
    en : {
    },
    fr : {
        MESSAGES : {
            GENERALERROR : 'Un problême est survenu, réessayez plus tard',
            NOCON : 'Veuillez vous connecter à internet'
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
                USERNAME : 'username',
                EMAIL : 'e-mail',
                PSW: 'mot de passe',
                CONFIRMPSW: 'confirmez mot de passe'
            },
            FOOTER : {
                MDP : 'MDP perdu',
                SIGN : 'Inscription',
                LOG : 'Connection'
            }
        },
        SIGNIN : {
            MESSAGES : {
                PASSWORDDIFF : 'Les mots de passe diffèrent',
                required : {
                    btUsername : "nom d'utilisateur requis",
                    btEmail : "email requis",
                    btPlainPassword : "mot de passe requis",
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
            SIGNIN : "Inscrivez vous sur BettyLeague !",
            CHOOSELEAGUE : "Bienvenue sur BettyLeague"
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