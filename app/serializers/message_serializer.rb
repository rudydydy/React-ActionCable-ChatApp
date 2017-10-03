class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :user, :created_at

  def user
    {
      id: object.user.id,
      username: object.user.username
    }
  end

  def created_at
    object.created_at.strftime("%d %B %Y")
  end
end
