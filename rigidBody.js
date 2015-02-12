
var aabb = require('aabb-3d')
,   vec3 = require('gl-vec3')


module.exports = RigidBody
  

/*
 *    RIGID BODY - internal data structure
 *
 * Only AABB bodies right now. Someday will likely need spheres?
*/


function RigidBody(avatar, _aabb) {
  this.avatar = avatar
  this.aabb = new aabb(_aabb.base, _aabb.vec) // clone
  this.velocity = vec3.create()
  this.resting = [ false, false, false ]
  // max friction force - i.e. friction coefficient times gravity
  this.friction = 1
  // TODO: make engine use these:
  this.restitution = .5
  // internals
  this._forces = vec3.create()
  this._impulses = vec3.create()
  this.mass = 1
  this.gravityMultiplier = 1
}

RigidBody.prototype.setPosition = function(p) {
  vec3.subtract(p,p,this.aabb.base)
  this.aabb.translate(p)
}
RigidBody.prototype.getPosition = function() {
  return Array.prototype.slice.call( this.aabb.base ) 
}
RigidBody.prototype.applyForce = function(f) {
  vec3.add( this._forces, this._forces, f )
}
RigidBody.prototype.applyImpulse = function(i) {
  vec3.add( this._impulses, this._impulses, i )
}


// temp
RigidBody.prototype.subjectTo = function() { /* NOP - TODO: remove? */ }
RigidBody.prototype.tick =      function() { /* NOP - TODO: remove? */ }
RigidBody.prototype.atRestX = function() { return this.resting[0] }
RigidBody.prototype.atRestY = function() { return this.resting[1] }
RigidBody.prototype.atRestZ = function() { return this.resting[2] }

