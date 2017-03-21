import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Camera, { constants } from 'react-native-camera';
import { uploadMedia } from '../actions/Index';
import CamFrontWhite from '../assets/camera/ic_camera_front_white.png';
import CamRearWhite from '../assets/camera/ic_camera_rear_white.png';
import FlashAutoWhite from '../assets/camera/ic_flash_auto_white.png';
import FlashOffWhite from '../assets/camera/ic_flash_off_white.png';
import FlashOnWhite from '../assets/camera/ic_flash_on_white.png';
import PhotoCamera from '../assets/camera/ic_photo_camera_36pt.png';
import Stop from '../assets/camera/ic_stop_36pt.png';
import VideoCam from '../assets/camera/ic_videocam_36pt.png';


class GramCreate extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: constants.Aspect.fill,
        captureTarget: constants.CaptureTarget.cameraRoll,
        type: constants.Type.back,
        orientation: constants.Orientation.auto,
        flashMode: constants.FlashMode.auto,
      },
      isRecording: false
    };
  }

  onPictureTaken(pic, type) {
    console.log(pic);
    this.props.uploadMedia(pic, type);
  }

  onVideoTaken(vid, type) {
    this.props.uploadMedia(vid, type);
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => {
          console.log(data);
          this.onPictureTaken(data, 'picture');
        })
        .catch(err => console.error(err));
    }
  }

  startRecording = () => {
    if (this.camera) {
      this.camera.capture({ mode: constants.CaptureMode.video })
          .then((data) => this.onVideoTaken(data, ''))
          .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  typeIcon() {
    let icon;
    const { back, front } = constants.Type;

    if (this.state.camera.type === back) {
      icon = { CamRearWhite };
    } else if (this.state.camera.type === front) {
      icon = { CamFrontWhite };
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  flashIcon() {
    let icon;
    const { auto, on, off } = constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = { FlashAutoWhite };
    } else if (this.state.camera.flashMode === on) {
      icon = { FlashOnWhite };
    } else if (this.state.camera.flashMode === off) {
      icon = { FlashOffWhite };
    }

    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture.bind(this)}
            >
              <Image
                  source={PhotoCamera}
              />
            </TouchableOpacity>
            ||
            null
          }
          <View style={styles.buttonsSpace} />
          {
              !this.state.isRecording
              &&
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.startRecording}
              >
                <Image
                    source={VideoCam}
                />
              </TouchableOpacity>
              ||
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.stopRecording}
              >
                <Image
                    source={Stop}
                />
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

export default connect(null, { uploadMedia })(GramCreate);
