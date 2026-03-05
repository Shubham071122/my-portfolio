import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your content management system preferences.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Theme Mode</Label>
                                <p className="text-xs text-muted-foreground">Toggle between light and dark mode for the admin panel.</p>
                            </div>
                            <ModeToggle />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Site Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Site Display Name</Label>
                            <Input id="siteName" defaultValue="Shubham's Portfolio" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ga">Google Analytics ID</Label>
                            <Input id="ga" placeholder="G-XXXXXXXXXX" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button>Save Settings</Button>
                </div>
            </div>
        </div>
    );
}
