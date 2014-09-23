import 'traceur';

class Thing {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
class Descendant extends Thing {
  constructor(x,y,prop){
    super(x,y);
    this.prop = prop;
    this.attr = "attr";
  }
  get props() { return this.prop; }
  set props(p) {
    this[p] = p;
  }
}
var arrows = (x)=>{
  return x * x;
}
return {
  vars : function(){
    let a = "a";
    const b = "b";
    var o = {
      a : a
    , b : b
    };
    return o;
  }
, arrows : arrows
, Descendant : Descendant
, Thing : Thing
, dft : function(opt = 2){
    return opt
  }
, shorthand : function(){
    let a = 2;
    var b = "b";
    return {a, b};
  }
, rest : function(arr,...items){
    for(var i of items){
      arr.push(i);
    }
  return arr;
  }
, literal : function(){
    let a = "world";
    var greeting = `hello ${a}`;
    return greeting;
  }
}
