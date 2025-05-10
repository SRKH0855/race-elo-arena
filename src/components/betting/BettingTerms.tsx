
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BettingTerms() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Betting Terms & Conditions</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>SimRacingKH Betting System Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Credit System</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Betting credits are an in-platform virtual currency and have no real-world monetary value.</li>
                  <li>Credits can be earned by converting your ELO rating points at a rate of 1 ELO = 10 Credits.</li>
                  <li>Maximum ELO conversion is limited to 100 ELO points per month.</li>
                  <li>Credits cannot be converted back to ELO points.</li>
                  <li>Credits may also be awarded through special platform events or achievements.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Betting Rules</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>All bet outcomes are determined by official race results as recorded in the Assetto Corsa Server Manager.</li>
                  <li>Once a bet is placed, it cannot be canceled or modified.</li>
                  <li>In the event of a race cancellation, all bets for that specific race will be void and credits returned.</li>
                  <li>If a driver does not participate in a race, bets placed on that driver will be void and credits returned.</li>
                  <li>The platform reserves the right to limit bet amounts on any market at its discretion.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Prizes & Rewards</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Credits accumulated through betting can be exchanged for SimRacingKH merchandise and virtual items.</li>
                  <li>The redemption rate for prizes is determined by the platform and may change from time to time.</li>
                  <li>Some prizes may require a minimum credit balance to redeem.</li>
                  <li>Physical prizes will be shipped only to addresses in supported countries.</li>
                  <li>Virtual items will be delivered to the user's platform account within 48 hours of redemption.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Responsible Participation</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>The SimRacingKH betting system is intended for entertainment purposes only.</li>
                  <li>Users should not attempt to exploit the betting system through unfair means or collusion.</li>
                  <li>Users found to be attempting to exploit the system may have their betting privileges revoked.</li>
                  <li>The platform reserves the right to modify these terms at any time with notification to users.</li>
                  <li>By participating in the betting system, users acknowledge and accept these terms and conditions.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-8 p-4 bg-muted/30 rounded-lg text-sm text-center">
            <p>By using the SimRacingKH betting system, you confirm that you have read, understood, and agree to these terms.</p>
            <p className="mt-2 text-muted-foreground">Last updated: May 1, 2025</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
