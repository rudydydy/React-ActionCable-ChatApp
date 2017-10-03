class MessagesController < ApplicationController

  def index
    @messages = Message.order(created_at: :desc).limit(15)
    render json: @messages, each_serializer: MessageSerializer, status: :ok
  end

  def create
    @message = Message.new message_params
    if @message.save
      message_payload = message_json(@message)
      ActionCable.server.broadcast "lobby", message: message_payload
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def load_more
    @last_message = Message.find params[:id]
    @messages = Message.where('created_at < ?', @last_message.created_at)
                       .order(created_at: :desc)
                       .limit(15)
    render json: @messages, each_serializer: MessageSerializer, status: :ok
  end

  private
    def message_params
      params.require(:message).permit(:body).merge(user_id: current_user.id)
    end

    def message_json message
      render(json: message, serializer: MessageSerializer, status: :ok)
    end

end
