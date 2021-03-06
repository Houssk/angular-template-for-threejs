import {moduleMetadata, storiesOf} from '@storybook/angular';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
// NOTE: Do direct import instead of library (allows to watch component and easy to develop)
import {AtftModule} from '../../../projects/atft/src/lib/atft.module';
import {withKnobs} from '@storybook/addon-knobs';
import {defaultSceneWrapper} from '../common/default-scene-wrapper';
import {BoxMeshComponent} from '../../../projects/atft/src/lib/object/mesh';
import * as THREE from 'three';
import {AnimationService} from '../../../projects/atft/src/lib/animation/animation.service';

@Component({
  template: defaultSceneWrapper(`
  <atft-box-mesh height="10" width="10" depth="10" material="phong" materialColor="0xffffff">
  </atft-box-mesh>
  `)
})
class StorybookAnimateLoopComponent implements AfterViewInit {

  @ViewChild(BoxMeshComponent, {static: false}) box;

  k = 0;

  constructor(private animationService: AnimationService) {

  }

  public ngAfterViewInit() {
    this.animate = this.animate.bind(this);
    this.animationService.animate.subscribe(this.animate);
    this.animationService.start();
  }

  public animate() {
    this.k += 0.02;
    this.box.rotateX = this.k;
    this.box.rotateY = -this.k * 2;
    this.box.rotateZ = this.k * 3.3;
    this.box.applyRotation();
  }

}


@Component({
  template: defaultSceneWrapper(`
  <atft-box-mesh height="10" width="10" depth="10" material="phong" materialColor="0xffffff">
  </atft-box-mesh>
  `)
})
class StorybookAnimateMixerComponent implements AfterViewInit {

  @ViewChild(BoxMeshComponent, {static: false}) box;

  private mixer: THREE.AnimationMixer;

  private clock = new THREE.Clock();
  private boxObject: THREE.Object3D;

  constructor(private animationService: AnimationService) {

  }

  public ngAfterViewInit() {
    this.boxObject = this.box.getObject();
    const positionKF = new THREE.VectorKeyframeTrack('.position', [0, 1, 2, 4], [0, 0, 0, 0, 50, 0, 0, 50, 5, 0, 0, 0]);
    const helloClip = new THREE.AnimationClip('Hello', 4, [positionKF]);
    this.mixer = new THREE.AnimationMixer(this.boxObject);
    const clipAction = this.mixer.clipAction(helloClip);
    clipAction.play();

    this.animate = this.animate.bind(this);
    this.animationService.animate.subscribe(this.animate);
    this.animationService.start();
  }

  public animate() {
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
  }

}


storiesOf('Animate', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        AtftModule
      ]
    }),
  )
  .add('loop', () => ({
    component: StorybookAnimateLoopComponent
  }))
  .add('mixer', () => ({
    component: StorybookAnimateMixerComponent
  }))
;



