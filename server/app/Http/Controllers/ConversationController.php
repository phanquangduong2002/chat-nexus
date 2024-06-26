<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }
    public function getConversations()
    {
        $conversations = Auth::id() ? Conversation::getConversationsForSidebar(Auth::user()) : [];

        return response()->json(['success' => true, 'conversations' => $conversations], 200);
    }

    public function changeUserRole()
    {
    }

    public function blockUser()
    {
    }
}
