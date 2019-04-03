import React, {Component} from 'react';
import {Platform, StyleSheet, View, Slider, Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup, Header, Button, CheckBox } from 'react-native-elements';
import files from '../../utils/Files';
import File from '../../utils/FileSystem';

var file;
export default class Options extends Component {


constructor(props){
    super(props);

    this.state = {

      index: 0,
      radius: 0 ,
      checked: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,

    }

    file = new File();


   }

    updateIndex = (index) => {

         this.setState({index});




    }


     updateRadius(radius){
     this.setState({radius:radius});
     //this.props.onRadiusChange(radius);
     }


  render() {
    return (

      <View style={styles.container}>

              <Header
                leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => {this.props.inOptions()} }}
                centerComponent={{ text: 'Options', style: { color: '#fff' } }}
               />



          <View style = {styles.group}>

                 <ButtonGroup
                  selectedBackgroundColor="pink"
                  onPress={this.updateIndex}
                  selectedIndex={this.state.index}
                  buttons={['Standard', 'Satellite']}
                  containerStyle={{height: 30}}
                 />

          </View>



          <View style={styles.container}>

                  <Text style={{fontWeight: 'bold',fontSize: 20, textAlign: 'center'}}> Radius </Text>

                  <Slider
                   style={{ width: 400 }}
                   step={10}
                   minimumValue={50}
                   maximumValue={5000}
                   value={this.state.radius}
                   onValueChange={(val)=>{this.updateRadius(val)}}
                  />

                  <Text style={styles.welcome}>
                    {this.state.radius}
                  </Text>

                </View>


                            <View style={styles.container}>
                            <CheckBox
                            title="Pizza"
                            checked={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })}
                             />
                             </View>

                              <View style={styles.container}>
                             <CheckBox
                             title="Coffee"
                             checked={this.state.checked2}
                             onPress={() => this.setState({ checked2: !this.state.checked2 })}
                              />
                              </View>

                              <View style={styles.container}>
                             <CheckBox
                             title="Burgers"
                             checked={this.state.checked3}
                             onPress={() => this.setState({ checked3: !this.state.checked3 })}
                              />
                              </View>

                              <View style={styles.container}>
                             <CheckBox
                             title="Chicken"
                             checked={this.state.checked4}
                             onPress={() => this.setState({ checked4: !this.state.checked4 })}
                              />
                              </View>

                              <View style={styles.container}>
                             <CheckBox
                             title="Parks"
                             checked={this.state.checked5}
                             onPress={() => this.setState({ checked5: !this.state.checked5 })}
                              />
                              </View>



      </View>

    );

  }



     async componentWillMount(){
       this.setState({radius:this.props.radius});
       this.setState({index:files.index});
        let prefExists = await file.fileExists('prefs');

         if(prefExists){
            let s = await file.fileRead('prefs');
            let s2 = s.split(" ");
                   for(i = 0; i < 5; i++){
                   if(s2[i] == "true")
                       s2[i] = true;
                   else
                       s2[i] = false;
                   }
                   this.setState({
                              checked: s2[0],
                              checked2: s2[1],
                              checked3: s2[2],
                              checked4: s2[3],
                              checked5: s2[4],
                    });
            }
     }

     async componentWillUnmount(){

        let s = "" +this.state.checked + " " + this.state.checked2 + " " + this.state.checked3 + " " + this.state.checked4 + " " + this.state.checked5;
        let prefExists = await file.fileExists('prefs');
        if(prefExists){
           file.createFile('prefs',s);
        }
        else{
           file.fileWrite('prefs',s);
        }



      this.props.onRadiusChange(this.state.radius);

      if(this.state.index==0){
            this.props.onMapChange('standard');
            }
            else{
            this.props.onMapChange('satellite');
            }
          files.index = this.state.index;
     }


}
const styles = StyleSheet.create({

  container: {
    flex: 0,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  group: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  slide: {
      textAlign: 'left',
      fontSize: 70,
      color: '#000000',
    },
    home:{
     width: 30,
     height: 30,
    }

});