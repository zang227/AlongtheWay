import request from '../lib/request';
import querystring from 'querystring';
import Config from './config/config';

class Foursquare  {

constructor(){

this.params ;

}



   setParams(params){

     this.params = params;

    }

   getParams(){

   return this.params;

   }


   search(){

    var config = Config.getConfig();
    var urlString = config.apiUrl + "/venues/search?" +
                    querystring.stringify(this.getParams()) + '&' +
                    querystring.stringify(config.creds);

      return request(urlString);

   }

   getDetails(place_id){
     var config = Config.getConfig();
      var urlString = config.apiUrl + "/venues/" + place_id + '?' + querystring.stringify(config.creds);
      return request(urlString);
   }


}


export default Foursquare;