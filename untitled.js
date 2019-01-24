import React from 'react';
import GazeButton from 'react-vr-gaze-button'
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
  Model,
  AmbientLight,
} from 'react-vr';
import Button from './button.js';

class prac_Time_Bender extends React.Component {
    state = {
    rotation: 130,
    zoom: -70,
    place: 'Start_screen.jpg',
    item1active: false,
    item2active: false,
    item3active: false,
    item4active: false,
    item5active: false,
    GazeButtClicked: false,
    textColor: 'pink'
    };

    

    styles = StyleSheet.create({
     menu: {
	       flex: 1,
         flexDirection: 'column',
         width: 1,
         alignItems: 'stretch',
         transform: [{translate: [0.5, 0.5, -4]}],
         },
     });

    rotate = this.rotate.bind(this);

    componentDidMount() {
      this.rotate();
    }

    componentWillUnmount() {
      if (this.frameHandle) {
        cancelAnimationFrame(this.frameHandle);
        this.frameHandle = null;
      }
    }

    rotate() {
      const now = Date.now();
      const delta = now - this.lastUpdate;
      const lastUpdate = Date.now();
      this.lastUpdate = now;

      this.setState({
  		    rotation: this.state.rotation + delta / 8
  	  });
      this.frameHandle = requestAnimationFrame(this.rotate);
    }

    handleItem1Click = event => {

        if (this.state.item1active === true) {
          this.setState({ item1active: false });
        } else{
          this.setState({ item1active: true });
        }
        console.log(this.state.item1active.toString())
      }


  render() {
    const {GazeButtClicked} = this.state

    let item1 =
    <VrButton onClick={ this.handleItem1Click } onEnter={this.handleItem1Click}

    onExit={this.handleItem1Click}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          width: 1,
          height: 0.5,
          borderColor: "black",
          transform: [{translate: [ 0, 1, -4 ]}]
      }}>
        <Text
          style={{
            fontSize: 0.2,
            color: 'black'
          }}
        >Click Button = {this.state.item1active.toString()}</Text>
      </View>
    </VrButton>

    return (

      <View>

      <Text
        style={{color: this.state.textColor, backgroundColor: '#fff', width: 0.75, transform: [{translate: [ 0, 1.3, -4 ]}]}}
        onEnter={() => this.setState({textColor: 'red'})}
        onExit={() => this.setState({textColor: 'pink'})}>
        This text will turn bright red when you look at it.
      </Text>

        { item1 }

        <Pano source={asset(this.state.place)}/>

        <View
          style={{transform: [{translate: [ 0, 1, -4 ]}]}}>
          <GazeButton onClick={() => this.setState({GazeButtClicked: true})} duration={2000}>
            {time => (
              <Text>
                {GazeButtClicked ? 'You have clicked me' : `Gaze me for ${time} milliseconds`}
              </Text>
            )}
          </GazeButton>
        </View>

        <AmbientLight intensity={ 2.6 }  />

        <View style={ this.styles.menu }>
          <Button text='+'
			       callback={() => this.setState((prevState) => ({ zoom: prevState.zoom + 10 }) ) } />
          <Button text='-'
			       callback={() => this.setState((prevState) => ({ zoom: prevState.zoom - 10 }) ) } />
        </View>
{/* PlainClock */}
        <Model
		      style={{
            transform: [
              {translate: [50, 20, this.state.zoom]},
              {scale: 0.50 },
              {rotateY: this.state.rotation},
              {rotateX: -90},
              {rotateZ: 0}
            ],
          }}
          source={{obj: asset('Clock 01.obj'), mtl: asset('Clock 01.mtl')}}
          texture={asset('df.png')}
		      lit={false}
        />
{/* WhiteClock */}
        <Model
		      style={{
            transform: [
              {translate: [-70, 0, this.state.zoom]},
              {scale: 20.00 },
              {rotateY: this.state.rotation/2},
              {rotateX: 0},
              {rotateZ: 0}
            ],
          }}
          source={{obj:asset('Clock_obj.obj'), mtl:asset('Clock_obj.mtl')}}

		      lit={false}
        />
{/* Hourglass */}
        <Model
		      style={{
            transform: [
              {translate: [-30, 20, this.state.zoom]},
              {scale: 0.75 },
              {rotateY: this.state.rotation/5},
              {rotateX: this.state.rotation/6},
              {rotateZ: 0}
            ],
          }}
          source={{obj:asset('hour glass.obj'), mtl:asset('hour glass.mtl')}}

		      lit={false}
        />
{/* LargeWallclock */}
        <Model
		      style={{
            transform: [
              {translate: [20, -2, this.state.zoom+120]},
              {scale: 0.40 },
              {rotateY: -60},
              {rotateX: 0},
              {rotateZ: 0}
            ],
          }}
          source={{obj: asset('wall clock.obj'),}}
          texture={asset('Wood.jpg')}

		      lit={false}
        />
{/* Nick */}
        <Model
		      style={{
            transform: [
              {translate: [-30, 10, this.state.zoom+130]},
              {scale: 2.00 },
              {rotateY: 170},
              {rotateX: -80},
              {rotateZ: 0}
            ],
          }}
          source={{obj: asset('Nick_model_mesh.obj'), mtl: asset('Nick_model_mesh.mtl')}}
          texture={asset('Nick_model_texture.jpg')}

		      lit={false}
        />
{/* Theobromine */}
        <Model
		      style={{
            transform: [
              {translate: [80, -10, this.state.zoom+110]},
              {scale: 3.00 },
              {rotateY: this.state.rotation/5},
              {rotateX: 90},
              {rotateZ: 0}
            ],
          }}
          source={{obj: asset('Theobromine.obj')}}
          texture={asset('theobromine.jpg')}
		      lit={false}
        />
{/* BRB button */}
        <Model
		      style={{
            transform: [
              {translate: [-2.75, -1, -4]},
              {scale: 3.00 },
              {rotateY: 30},
              {rotateX: 60},
              {rotateZ: 0}
            ],
          }}
          source={{obj: asset('BRB.obj')}}
          texture={asset('DefaultMaterial_Base_Color.png')}
		      lit={false}
        />

        <Text
          style={{
            backgroundColor: '#d89522',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -4]}],
          }}>
          Time Bender
        </Text>

      </View>
    );
  }
};

AppRegistry.registerComponent('prac_Time_Bender', () => prac_Time_Bender);
