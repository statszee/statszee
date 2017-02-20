module.exports = {
  stores: [
    {
      name: 'memory-store',
      type: 'memory',
      max:  1000,
      ttl:  3600
    }],
  defaults: ['memory-store']
}
