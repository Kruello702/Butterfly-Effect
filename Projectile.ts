import * as hz from 'horizon/core';

class Projectile extends hz.Component<typeof Projectile> {
  static propsDefinition = {
    damage: { type: hz.PropTypes.Number, default: 10 },
    target: { type: hz.PropTypes.Entity }
  };

  private OnProjectileHitEvent = new hz.CodeBlockEvent<[entity: hz.Entity, damage: number]>('OnProjectileHitEvent', [hz.PropTypes.Entity, hz.PropTypes.Number]);

  start() {
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnProjectileHitEntity, (entityHit: hz.Entity) => {
      if (entityHit === this.props.target!) {
        this.sendCodeBlockEvent(entityHit, this.OnProjectileHitEvent, entityHit, this.props.damage!);
      }
    });
  }
}

hz.Component.register(Projectile);