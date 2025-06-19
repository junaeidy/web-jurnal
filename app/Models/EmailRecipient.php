<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailRecipient extends Model
{
    protected $fillable = ['email_campaign_id', 'email', 'status', 'error_message'];

    public function campaign()
    {
        return $this->belongsTo(EmailCampaign::class, 'email_campaign_id');
    }
}
