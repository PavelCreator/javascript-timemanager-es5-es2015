mathSvc = {
  fix: 1000000,
  sum: function(a1,a2) {
    return (a1*this.fix + a2*this.fix)/this.fix;
  },
  subtraction: function(a1,a2) {
    return (a1*this.fix - a2*this.fix)/this.fix;
  },
  multiplication: function(a1,a2) {
    return (a1*this.fix*a2)/this.fix;
  },
  division: function(a1,a2) {
    return (a1*this.fix/a2)/this.fix;
  }
}