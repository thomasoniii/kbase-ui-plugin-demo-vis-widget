# Vis Widget Demo Plugin

The vis widget demo plugin provides four (at this moment) panel widgets, route end points, and menu entries to demonstrate barchart, heatmap, linechart, and scatterplot charts. 

The setup steps below represent how to do this *today*. The process will be simplified soon.

Note that in order for the demo to actually work, the vis widgets plugin must already be installed. In kbase/kbase-ui the plugin is currently set up correctly. Note that it is currently pulled from eapearson/kbase-ui-plugin-vis-widgets. If the widgets and dependencies are integrated directly into kbase-ui, and the module names stay the same, there should be no difference.

## 1) Get the kbase-ui

In a directory of your choosing, clone the kbase-ui repo:

> ```
mkdir demo
cd demo
git clone https://github.com/kbase/kbase-ui.git
> ```

## 2) Add the vis widget demo plugin as a *bower dependency*

Adding the plugin to the bower config file will ensure that it will be installed into the kbase-ui. Bower can install a package directly from a github repo, and in fact has a special short-hand format for doing so. Although in the future we will utilize the bower central catalog to take full advantage of semantic versioning and simplified configuration, for now we are installing directly from github.

Within the kbase-ui repo, locate this file ```demo/kbase-ui/bower.json```. In the dependencies section, place this line:
        
> ```
"kbase-ui-plugin-demo-vis-widget": "eapearson/kbase-ui-plugin-demo-vis-widget#master",
> ```

Notes:    
    - you might want to fork this and install it from your own account
    - the ```#master``` suffix indicates the git branch to fetch from. By indicating a branch, bower will also track the most recent commit, and will update the local package if the branch is updated.
        
## 3) Update the *grunt build script* to include the plugin in the build

In the kbase-ui repo, locate this file ```demo/kbase-ui/Gruntfile.js```, locate the ```bowerFiles``` object, and insert the following item:

> ```
{
    name: 'kbase-ui-plugin-demo-vis-widget',
    cwd: 'src/plugin',
    src: ['**/*']
},
> ```

## 4) Next we need to ensure that our build process will target the *test* ui configuration.

The ui contains three sets of configuration files. One of these config sets controls the set of plugins loaded into the runtime, as well as the menu items. By switching to the test configuration we can freely add the new plugins and menu items.

In the ```Gruntfile.js``` from above, locate the *uiTarget* variable and make sure the value is ```test```.

> ```
uiTarget = 'test';
> ```

## 5) Update the test ui config to load the plugin

The ui config files are located in the top level config directory, and are named ```ui-test.yml``` and ```ui-prod.yml```. The *uiTarget* value is used to locate the required config file, thus *test* and *prod*.

> ```
kbase-ui/config/ui-test.yml
> ```

The config files are in the YAML format. The file has two top-level properties -- *plugins* and *menu*. The *plugins* section specifies the plugins to load into the runtime, and the *menu* section defines the composition of the main (hamburger) menu.

The plugin sections is currently composed of a list of lists. The first list level defines sets of plugins which are loaded in order. The second list level specifies the actual lists of plugins and are loaded in arbitrary order. The first level is ordered because presently there are dependencies between plugins, and the ordering ensures that core plugins are loaded first.Normally we just worry about putting items into the second group.

In order for our plugin to load into the ui runtime, we need to provide an appropriate entry. These entries take two forms. The simple form is a string which specifies a directory within ```kbase-ui/src/plugins```. These are internal plugins. We want to create in the second form:

> ```
        -
            name: viswidgetdemo
            directory: bower_components/kbase-ui-plugin-demo-vis-widget
> ```

This one instructs the ui to look for the plugin in the specified path relative to the build directory.

## 6) Update the test ui config to use the *demo menu items*.

The plugin configuration registers four menu items in the runtime, but does not install them on the menu. In order for an available menu item to appear, it needs to be added to the appropriate location in ```ui-test.yml```. 

There are two menus -- authenticated and unauthenticated. If a kbase token is present, the authenticated menu is displayed. You may use either or both menus for testing. In addition, each menu has three sections -- main, developer, and help. It is best to place testing menu entries like these into the development section.

In the demo plugin, the ```config.yml``` file contains a section specifying menu items to be added to the system. The *name* property is what we will add to the ui config in order to have them appear in the main menu.

Back in ```ui-test.yml```, we will be editing the *menu* section. We will simply be adding each of the menu names we find in the plugin config to the developer menu array for either or both of the authenticated and unauthenticated menus.

This is how the default menu will look after adding the four demo menu items.

> ```
        menus:
            authenticated: 
                main: [narrative, search, dashboard]
                developer: [visdemoBarchart, visdemoHeatmap, visdemoLinechart, visdemoScatterplot]
                help: [about-kbase, contact-kbase]
            unauthenticated: 
                main: [search]
                help: [about-kbase, contact-kbase]
> ```

## 7) Build and inspect

If all went well, you should be able to build the ui and inspect it with a browser. Below are the "manual" steps:

- in the top level of the repo, fetch the npm packages:

        npm install

- Next build ui runtime

        grunt build

- Now to view the web app:

        grunt preview

The grunt preview can be a bit wonky. It will start a mini-web server with the build/client directory as the root, and then open up the system default web browser pointed there. I've found that if that browser is Safari, and Safari is already open, the load may fail. Closing Safari and then reissuing ```grunt preview``` leads to success. (I don't know about other browser.)

In my normal developer flow (on Netbeans) I utilize the built-in server.
