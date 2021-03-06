import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component} from '@angular/core';
// NOTE: Do direct import instead of library (allows to watch component and easy to develop)
import {AtftModule} from '../../../projects/atft/src/lib/atft.module';
import {defaultSceneWrapper} from '../common/default-scene-wrapper';
import {worldSceneWrapper} from '../common/world-scene-wrapper';


@Component({
  template: defaultSceneWrapper(`
      <atft-object-loader model="assets/model/Server.json">
      </atft-object-loader>
  `)
})
class StorybookObjectLoaderComponent {

}


const modelPath = 'https://raw.githubusercontent.com/makimenko/files/master/angular-template-for-threejs/model/SampleArchitecture';

@Component({
  template: worldSceneWrapper(`
      <atft-obj-loader
              model="${modelPath}/SampleArchitecture.obj"
              material="${modelPath}/SampleArchitecture.mtl"
              resourcePath="${modelPath}/"
              translateX="-60" translateY="-40" translateZ="0.5">
          >
      </atft-obj-loader>
  `)
})
class StorybookObjLoaderComponent {

}


@Component({
  template: defaultSceneWrapper(`
      <atft-svg-loader model="./assets/svg/worldwide.svg" maxX="15" maxY="15">
      </atft-svg-loader>
      <atft-svg-loader model="./assets/svg/grid-world.svg" overrideMaterialColor="0x0000ff"
        maxX="10" maxY="10"  translateZ="2">
      </atft-svg-loader>
  `)
})
class StorybookSVGLoaderComponent {

}


storiesOf('Loader', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        AtftModule
      ]
    }),
  )
  .add('JSON', () => ({
    component: StorybookObjectLoaderComponent
  }))
  .add('Wavefront obj+mtl', () => ({
    component: StorybookObjLoaderComponent
  }))
  .add('svg', () => ({
    component: StorybookSVGLoaderComponent
  }))
;
