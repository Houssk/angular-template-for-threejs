import {NgModule} from '@angular/core';
import {AtftCameraModule} from './camera/atft-camera.module';
import {AtftObjectModule} from './object/atft-object.module';
import {AtftControlModule} from './control/atft-control.module';
import {AtftPipeModule} from './pipe/atft-pipe.module';
import {AtftRendererModule} from './renderer/atft-renderer.module';
import {AtftAnimationModule} from './animation/atft-animation.module';
import {AtftRaycasterModule} from './raycaster/atft-raycaster.module';

// NOTE: In case of "ERROR in Unexpected value 'undefined' exported by the module 'AtftModule" fix imports (do not import index.ts)

@NgModule({
  imports: [
    AtftCameraModule,
    AtftObjectModule,
    AtftControlModule,
    AtftPipeModule,
    AtftRendererModule,
    AtftAnimationModule,
    AtftRaycasterModule
  ],
  exports: [
    AtftCameraModule,
    AtftObjectModule,
    AtftControlModule,
    AtftPipeModule,
    AtftRendererModule,
    AtftAnimationModule,
    AtftRaycasterModule
  ]
})
export class AtftModule {
}
