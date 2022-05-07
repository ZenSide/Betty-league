# Betty-league

## install env

install nodejs  
install bower  
install "n" to use old nodejs

    sudo apt install -g n
    sudo n 7.4.0

install ionic

    sudo apt install -g ionic@3.20.0
    sudo apt install -g cordova@8.0.0

install libpng12 for minify

    sudo add-apt-repository ppa:linuxuprising/libpng12
    sudo apt update
    sudo apt install libpng12-0


## build

    ionic build

    bower install

## dev server

    ionic serve

## minify

    #minify-conf.json
    "alwaysRun": true,

    ionic build
