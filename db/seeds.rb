Meeting.destroy_all

Meeting.create(
  name: "Brainstorm with client",
  start_time: DateTime.new(2015, 12, 1, 13, 30),
  end_time: DateTime.new(2012, 12, 1, 15, 30),
  address: "414 N Orleans St, Chicago, IL 60654"
)

Meeting.create(
  name: "Create todo items",
  start_time: DateTime.new(2015, 12, 1, 15, 30),
  end_time: DateTime.new(2012, 12, 1, 17, 0),
  address: "222 W Merchandise Mart Plaza, Chicago, IL 60654"
)

Meeting.create(
  name: "First demo to client",
  start_time: DateTime.new(2015, 12, 1, 15, 30),
  end_time: DateTime.new(2012, 12, 1, 17, 0),
  address: "222 W Merchandise Mart Plaza, Chicago, IL 60654"
)