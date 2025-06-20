<?php

namespace App\Jobs;

use App\Models\EmailRecipient;
use Illuminate\Support\Facades\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendCampaignEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $recipient;

    public function __construct(EmailRecipient $recipient)
    {
        $this->recipient = $recipient;
    }

    public function handle()
    {
        try {
            $campaign = $this->recipient->campaign;

            // Menggunakan Mail::html() untuk mengirimkan HTML email
            Mail::html($campaign->content, function ($message) use ($campaign) {
                $message->to($this->recipient->email)
                    ->subject($campaign->subject);
            });

            $this->recipient->update(['status' => 'sent']);
        } catch (\Exception $e) {
            $this->recipient->update(['status' => 'failed']);
            \Log::error("Gagal kirim email ke {$this->recipient->email}: " . $e->getMessage());
        }
    }
}
