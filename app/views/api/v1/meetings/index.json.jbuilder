json.meetings do
  json.array! @meetings, partial: 'meeting', as: :meeting
end
json.members @members do |member|
  json.id member.id
  json.email member.email
end