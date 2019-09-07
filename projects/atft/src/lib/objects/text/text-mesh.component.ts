import {Component, forwardRef, Input} from '@angular/core';
import * as THREE from 'three';
import {AbstractObject3D} from '../abstract-object-3d';
import {AbstractLazyObject3D} from '../abstract-lazy-object-3d';
import {appliedColor} from '../../utils/applied-color';
import {appliedMaterial} from '../../utils';

@Component({
  selector: 'atft-text-mesh',
  providers: [{provide: AbstractObject3D, useExisting: forwardRef(() => TextMeshComponent)}],
  template: '<ng-content></ng-content>'
})
export class TextMeshComponent extends AbstractLazyObject3D {

  @Input()
  material = 'basic';

  @Input()
  materialColor = 0xDADADA;

  @Input()
  text = 'Text';

  @Input()
  size = 10;

  @Input()
  height = 0.3;

  @Input()
  curveSegments = 2;

  @Input()
  bevelEnabled = false;

  @Input()
  bevelThickness = 0.1;

  @Input()
  bevelSize = 0.1;

  @Input()
  bevelOffset = 0;

  @Input()
  bevelSegments = 1;

  @Input()
  fontUrl = './assets/font/helvetiker_regular.typeface.json';

  @Input()
  castShadow = true;

  @Input()
  receiveShadow = true;

  @Input()
  depthWrite = true;


  public getMaterial(): THREE.Material {
    return appliedMaterial(this.materialColor, this.material, this.depthWrite);
  }

  protected async loadLazyObject(): Promise<THREE.Object3D> {
    // console.log('TextMeshComponent.loadLazyObject');

    return new Promise<THREE.Object3D>(resolve => {
      const loader = new THREE.FontLoader();
      loader.load(this.fontUrl, font => {

        const geometry = new THREE.TextGeometry(this.text, {
          font: font,
          size: this.size,
          height: this.height,
          curveSegments: this.curveSegments,
          bevelEnabled: this.bevelEnabled,
          bevelThickness: this.bevelThickness,
          bevelSize: this.bevelSize,
          bevelOffset: this.bevelOffset,
          bevelSegments: this.bevelOffset
        });
        const material = this.getMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = this.castShadow;
        // mesh.receiveShadow = this.receiveShadow;
        resolve(mesh);
      });
    });


  }

}