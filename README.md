# Categories Layout Override

This Discourse theme component will allow you to change the layout style of the categories page for a specific theme

For more information see: https://meta.discourse.org/t/categories-layout-override/131098


PostAction.where(post_action_type_id: PostActionType.types[:spam]).where.not(disagreed_at: nil).pluck(:post_id)