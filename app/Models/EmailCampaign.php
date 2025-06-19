<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailCampaign extends Model
{
    protected $fillable = ['name', 'subject', 'content', 'status'];

    public function recipients()
    {
        return $this->hasMany(EmailRecipient::class, 'email_campaign_id');
    }
}
