import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Bot, Info, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CreateBot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [slippage, setSlippage] = useState([1]);
  const [priorityFee, setPriorityFee] = useState([5]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleCreateBot = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the user ID from localStorage (the way your app currently stores it)
      const userId = localStorage.getItem("tradebotId");
      
      if (!userId) {
        throw new Error('You must be logged in to create a bot');
      }
      
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement);
      const botData = {
        userId, // Include userId in the request
        name: formData.get('botName'),
        tokenAddress: formData.get('tokenAddress'),
        quantity: formData.get('quantity'),
        slippage: slippage[0],
        priorityFee: priorityFee[0],
        gasLimit: formData.get('gasLimit'),
        maxGas: formData.get('maxGas'),
        stopLoss: formData.get('stopLoss'),
        takeProfit: formData.get('takeProfit'),
        customRpc: formData.get('customRpc')
      };
      
      // Send request to backend
      const response = await axios.post(`${API_URL}/bots`, botData);
      
      toast({
        title: "Bot Created Successfully",
        description: "Your trading bot has been created and is now ready to use.",
      });
      
      navigate("/dashboard/bots");
    } catch (err: any) {
      console.error("Error creating bot:", err);
      
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to create bot. Please try again.';
      
      setError(errorMessage);
      
      toast({
        title: "Error Creating Bot",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <Button 
          variant="ghost" 
          asChild 
          className="mb-4 pl-0 text-muted-foreground hover:text-foreground"
        >
          <Link to="/dashboard/bots">
            <ChevronLeft size={16} className="mr-1" /> Back to Bots
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gradient">Create Trading Bot</h1>
        <p className="text-muted-foreground mt-2">Configure your new automated trading bot settings</p>
      </div>

      <div className="glass-morphism rounded-xl p-8 animate-slide-in">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/50">
            <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleCreateBot}>
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="botName">Bot Name</Label>
                  <Input 
                    id="botName" 
                    placeholder="Enter a name for your bot" 
                    className="bg-secondary border-white/10"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="tokenAddress">Token Address</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="ml-2 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">Enter the contract address of the token you want to trade.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="tokenAddress" 
                    placeholder="0x..." 
                    className="bg-secondary border-white/10 font-mono"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity to Buy</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="0" 
                    step="0.001" 
                    placeholder="Enter amount to buy" 
                    className="bg-secondary border-white/10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Slippage Tolerance: {slippage}%</Label>
                  </div>
                  <Slider 
                    defaultValue={slippage} 
                    max={10} 
                    step={0.1} 
                    onValueChange={setSlippage} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.1%</span>
                    <span>5%</span>
                    <span>10%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Priority Fee: {priorityFee} GWEI</Label>
                  </div>
                  <Slider 
                    defaultValue={priorityFee} 
                    max={50} 
                    step={1} 
                    onValueChange={setPriorityFee} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 GWEI</span>
                    <span>25 GWEI</span>
                    <span>50 GWEI</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gasLimit">Gas Limit</Label>
                  <Input 
                    id="gasLimit" 
                    type="number" 
                    defaultValue={300000} 
                    className="bg-secondary border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxGas">Max Gas Price (GWEI)</Label>
                  <Input 
                    id="maxGas" 
                    type="number" 
                    defaultValue={100} 
                    className="bg-secondary border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                  <Input 
                    id="stopLoss" 
                    type="number" 
                    defaultValue={10} 
                    className="bg-secondary border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="takeProfit">Take Profit (%)</Label>
                  <Input 
                    id="takeProfit" 
                    type="number" 
                    defaultValue={20} 
                    className="bg-secondary border-white/10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customRpc">Custom RPC URL (Optional)</Label>
                <Input 
                  id="customRpc" 
                  placeholder="https://..." 
                  className="bg-secondary border-white/10"
                />
              </div>
              
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-500 mb-1">Advanced Settings Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    These settings are for experienced users. Incorrect configuration may result in failed transactions or unexpected behavior.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                className="border-white/10"
                onClick={() => navigate("/dashboard/bots")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-purple hover:bg-purple-light"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <><Bot size={16} className="mr-2" /> Create Bot</>
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CreateBot;
