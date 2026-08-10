<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use NotificationChannels\WebPush\HasPushSubscriptions;

class PushSubscriber extends Model
{
    use HasFactory, Notifiable, HasPushSubscriptions;

    protected $fillable = ['guest_id']; // Optional, if we want to track visitors
}
