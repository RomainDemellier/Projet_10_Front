# Projet_10_Front

Si ce n'est pas déjà fait commencez par cloner la partie java du projet 10. Pour ce faire rendez vous sur la page https://github.com/RomainDemellier/Projet_10_Back et suivez les instructions du README.md.

Pour faire fonctionner cette application **ANGULAR** vous aurez besoin de **NODE.JS**, de **NPM** et de **ANGULAR/CLI**. Si vous ne disposez pas de l'un de ces outils, allez sur la page https://openclassrooms.com/fr/courses/4668271-developpez-des-applications-web-avec-angular/5086918-installez-les-outils-et-creez-votre-projet et installez les.

Maintenant clonez le code de l'applicaiton en tapant en ligne de commande :
```
git clone https://github.com/RomainDemellier/Projet_10_Front.git
```
Ensuite placez vous sous le dossier Projet_7_OC_Front_Angular :
```
cd Projet_10_Front/
```
puis sous le dossier projet7Angular :
```
cd projet10Angular/
```
Tapez la commande suivante :

```	
ng build --prod --base-href=/angular/
```
Un dossier nommé **dist** est créé et sous ce dossier un autre nommé **projet10Angular**. Copiez tous les fichiers de ce dernier et placez les dans un dossier nommé **angular** (que vous devez créer) dans le dossier **webapps** de **apache-tomcat**. Il faut maintenant lancer tomcat :

Sous Windows :
```
startup.bat
```
Sous Linux :
```
startup.sh 
```
Une fois lancé ouvrez votre navigateur et tapez dans la zone url :

http://localhost:8080/angular/ 
