# assistant-temperature-local

Ce plugin de [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) permet de connaître la température dans une zone précise, à partir des [stations Netatmo](https://weathermap.netatmo.com/).

**ATTENTION** : le plugin [`assistant-notifier`](https://aymkdn.github.io/assistant-plugins/?plugin=notifier) est **OBLIGATOIRE** afin d'avoir un retour vocal sur son Google Home.

## Installation

Si vous n'avez pas installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), alors il faut le faire, et sélectionner **temperature-local** comme plugin.

Si vous avez déjà installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), et que vous souhaitez ajouter ce plugin, alors :
  - Pour Windows, télécharger [`install_temperature-local.bat`](https://github-proxy.kodono.info/?q=https://raw.githubusercontent.com/Aymkdn/assistant-temperature-local/master/install_temperature-local.bat&download=install_temperature-local.bat) dans le répertoire `assistant-plugins`, puis l'exécuter en double-cliquant dessus.  
  - Pour Linux/MacOS, ouvrir une console dans le répertoire `assistant-plugins` et taper :  
  `npm install assistant-temperature-local@latest --save --loglevel error && npm run-script postinstall`

## Configuration

Aucune configuration requise.

## Utilisation

Il va d'abord falloir déterminer la zone pour laquelle vous souhaitez connaitre la température moyenne : 
  1) Vérifier que Netatmo propose des stations dans la zone souhaitée : https://weathermap.netatmo.com/  
  2) Si oui, se rendre sur https://www.google.fr/maps  
  3) Sur Google Maps, on va délimiter de façon imaginaire la zone/carré que l'on souhaite pour notre calcul des températures.   Pour ce faire :  
     * Cliquer droit sur la carte dans **l'angle supérieur droit** de la zone/carré imaginaire, puis choisir *Plus d'infos sur cet endroit* :  
      ![capture](https://user-images.githubusercontent.com/946315/34818410-01ac7d20-f6bb-11e7-8fb8-dfacb1eb96b8.PNG)
     * Un message apparait en bas de la carte :  
      ![card](https://user-images.githubusercontent.com/946315/34818779-211194b0-f6bc-11e7-9246-b2eb84b5532a.png)
     * On clique sur les nombres ; un panneau latéral va s'ouvrir indiquant les mêmes nombres (qui sont des coordonnées GPS) :  
      ![capture](https://user-images.githubusercontent.com/946315/34818449-1c3bd1f4-f6bb-11e7-84c1-4258bf101fa4.PNG)
     * Noter ces coordonnées qui correspondent à la **latitude Nord-Est** (le premier chiffre, ici c'est *43.612026*), et la **longitude Nord-Est** (second chiffre, ici c'est *3.931351*)
  4) Maintenant on fait de même avec **l'angle inférieur gauche** de la zone/carré imaginaire
     * Cela va nous donner la **latitude Sud-Ouest** (par exemple *43.600426*), et la **longitude Sud-Ouest** par exemple (par exemple *3.897817*)

Maintenant on peut créer l'applet : 
  1) Créer une nouvelle *applet* dans IFTTT : [https://ifttt.com/create](https://ifttt.com/create)  
  2) Cliquer sur **this** puis choisir **Google Assistant**  
  3) Choisir la carte **Say a simple phrase** (ou autre, selon votre cas)  
  4) Dans *« What do you want to say? »* mettre la phrase qui va déclencher l'action (par exemple : *quelle est la température dans le quartier*)  
  5) Remplir les autres champs de la carte  
  6) Maintenant, cliquer sur **that** puis choisir **Pushbullet**  
  7) Choisir la carte **Push a Note**  
  8) Dans le champs *« Title »*, mettre `Assistant`  
  9) Dans le champs *« Message »*, mettre `temperature-local_` suivi par une chaine spéciale composée des nombres trouvés plus hauts. Dans notre exemple cela donne :  
   `temperature-local_{'lat_ne':43.612026,'lon_ne':3.931351,'lat_sw':43.600426,'lon_sw':3.897817}` 
  10) Enregistrer puis cliquer sur **Finish**  
  11) Dites : « OK Google » suivi de votre phrase spéciale du point 4)  
  12) Et Google Home va vous donner la température moyenne trouvée sur la zone.
  

N'hésitez pas à poser vos questions ici : https://github.com/Aymkdn/assistant-temperature-local/issues

