# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Image.destroy_all

Image.create name: 'battlemap-grid', location: './img/battlemap-grid.jpg'
Image.create name: 'cave-entrance', location: './img/cave-entrance.jpg'
Image.create name: 'cragmaw-cave', location: './img/cragmaw-cave.jpg'
Image.create name: 'palace', location: './img/palace.jpg'
Image.create name: 'redbrand-hideout', location: './img/redbrand-hideout.jpg'
Image.create name: 'two-buildings', location: './img/two-buildings.jpg'
Image.create name: 'white-canvas', location: './img/white-canvas.jpg'


