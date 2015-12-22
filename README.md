# Theme for [androo.pro(http://www.androo.pro/nerd)



List of core Ghost files I've touched/done stuff to:

server/
  
  api/
    tags.js
  routes/
    frontend.js
  middleware/
    index.js
  
  
  
  tags.js
      added list function:
      
       list : function list(){
         return dataProvider.Tag.findAll().then(function(result){
           return { tags: result.toJSON() };
   
         });
       }
      
      
  frontend.js
    Appended api = require('../api'); to the initial listing of required items.
    Prepended router.get('/api/public/posts/', api.http(api.posts.browse)); to the route listing

  index.js
    added:
      var coveragePath = '../../../content/themes/andwee/tests/results/coverage/';
      expressServer.use(subdir + '/coverage/', express.static( path.join(__dirname, coveragePath)));
